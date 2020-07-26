import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('dateTime', { static: true }) datePicker: IonDatetime;
  title: string;
  date: string;
  constructor() {}

  ngOnInit(): void {
    const date = new Date();
    this.title = date.toISOString();
    this.date = date.toISOString();
  }

  updateMyDate($event) {
    const pickedDate = new Date($event.detail.value);
    this.title = pickedDate.toISOString();
  }

  onOpenCalendar(): void {
    this.datePicker.open();
  }
}
