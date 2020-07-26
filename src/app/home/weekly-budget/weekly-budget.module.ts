import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyBudgetPageRoutingModule } from './weekly-budget-routing.module';

import { WeeklyBudgetPage } from './weekly-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyBudgetPageRoutingModule
  ],
  declarations: [WeeklyBudgetPage]
})
export class WeeklyBudgetPageModule {}
