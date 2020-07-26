import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  IonDatetime,
  ModalController,
  LoadingController,
  AlertController,
  IonItemSliding,
} from '@ionic/angular';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { IBudget, Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private budgetSub: Subscription;
  @ViewChild('dateTime', { static: true }) datePicker: IonDatetime;
  loadedBudgets: Budget[];
  title: string;
  date = new BehaviorSubject<string>(new Date().toISOString());
  isLoading = false;
  totalIn: number;
  totalOut: number;
  totalSum: number;
  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private alert: AlertController,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.date.subscribe((date) => {
      this.title = date;
    });

    this.budgetSub = this.budgetService.budgets.subscribe((budgets) => {
      this.loadedBudgets = budgets;
      let inc = 0;
      let out = 0;

      for (const i of budgets) {
        if (i.type === 1) {
          inc += i.amount;
        } else if (i.type === 2) {
          out += i.amount;
        }
      }

      this.totalIn = inc;
      this.totalOut = out;
      this.totalSum = inc - out;
    });
  }

  ngOnDestroy(): void {
    if (this.budgetSub) {
      this.budgetSub.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.date.subscribe((date) => {
      this.budgetService.fetchBudgets(date.split('T')[0]).subscribe(() => {
        this.isLoading = false;
      });
    });
  }

  updateMyDate($event: any) {
    const pickedDate = new Date($event.detail.value);
    this.date.next(pickedDate.toISOString());
  }

  onOpenCalendar(): void {
    this.datePicker.open();
  }

  onAddNewBudget(): void {
    this.modal
      .create({
        backdropDismiss: false,
        component: AddBudgetComponent,
      })
      .then((el) => {
        el.present();
        return el.onDidDismiss();
      })
      .then((result) => {
        if (result.data) {
          const budget: IBudget = result.data;
          budget.date = this.title.split('T')[0];
          this.loading
            .create({
              message: 'Guardando transaccion...',
            })
            .then((el) => {
              el.present();
              this.budgetService.addNewBudget(budget).subscribe(
                (resp) => {
                  el.dismiss();
                  console.log(resp);
                },
                (err) => {
                  el.dismiss();
                  const message = err.error.error;
                  this.alert
                    .create({
                      buttons: [
                        {
                          text: 'Ok',
                          cssClass: 'text-danger',
                        },
                      ],
                      message,
                      backdropDismiss: false,
                    })
                    .then((a) => a.present());
                }
              );
            });
        }
      });
  }

  onDeletingBudget(budgetId: string, slidingEl: IonItemSliding): void {
    slidingEl.close();
    this.loading.create({ message: 'Eliminando...' }).then((el) => {
      el.present();
      this.budgetService.deleteBudget(budgetId).subscribe(() => {
        el.dismiss();
      });
    });
  }

  delitingOnSlide(budgetId: string, slidingEl: IonItemSliding) {
    slidingEl.getOpenAmount().then((num) => {
      if (num >= 300) {
        this.onDeletingBudget(budgetId, slidingEl);
      }
    });
  }
}
