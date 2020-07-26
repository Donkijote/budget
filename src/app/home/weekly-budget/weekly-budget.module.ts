import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyBudgetPageRoutingModule } from './weekly-budget-routing.module';

import { WeeklyBudgetPage } from './weekly-budget.page';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyBudgetPageRoutingModule,
    SharedModule,
  ],
  declarations: [WeeklyBudgetPage],
})
export class WeeklyBudgetPageModule {}
