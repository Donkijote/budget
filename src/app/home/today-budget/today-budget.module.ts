import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayBudgetPageRoutingModule } from './today-budget-routing.module';

import { TodayBudgetPage } from './today-budget.page';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayBudgetPageRoutingModule,
    SharedModule,
  ],
  declarations: [TodayBudgetPage],
})
export class TodayBudgetPageModule {}
