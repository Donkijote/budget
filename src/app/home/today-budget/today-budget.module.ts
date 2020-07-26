import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayBudgetPageRoutingModule } from './today-budget-routing.module';

import { TodayBudgetPage } from './today-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayBudgetPageRoutingModule
  ],
  declarations: [TodayBudgetPage]
})
export class TodayBudgetPageModule {}
