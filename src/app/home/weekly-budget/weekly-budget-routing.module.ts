import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyBudgetPage } from './weekly-budget.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyBudgetPageRoutingModule {}
