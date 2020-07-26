import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayBudgetPage } from './today-budget.page';

const routes: Routes = [
  {
    path: '',
    component: TodayBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayBudgetPageRoutingModule {}
