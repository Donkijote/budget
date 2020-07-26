import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  IonDatetime,
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { IBudget } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private budgetSub: Subscription;
  @ViewChild('dateTime', { static: true }) datePicker: IonDatetime;
  title: string;
  date = new Date().toISOString();
  isLoading = false;
  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private alert: AlertController,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.title = this.date;

    this.budgetSub = this.budgetService.budgets.subscribe((budgets) => {
      console.log(budgets);
    });
  }

  ngOnDestroy(): void {
    if (this.budgetSub) {
      this.budgetSub.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.budgetService.fetchBudgets(this.date.split('T')[0]).subscribe(() => {
      this.isLoading = false;
    });
  }

  updateMyDate($event: any) {
    const pickedDate = new Date($event.detail.value);
    this.title = pickedDate.toISOString();
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
        const budget: IBudget = result.data;
        budget.date = this.date.split('T')[0];
        this.loading
          .create({
            message: 'Guardando transaccion',
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
      });
  }
}
