import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonDatetime,
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { IBudget } from '../models/budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('dateTime', { static: true }) datePicker: IonDatetime;
  title: string;
  date: string;
  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private alert: AlertController,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    const date = new Date();
    this.title = date.toISOString();
    this.date = date.toISOString();
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
        budget.date = new Date(this.date);
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
