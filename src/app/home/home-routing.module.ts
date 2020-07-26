import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'today',
        loadChildren: () =>
          import('./today-budget/today-budget.module').then(
            (m) => m.TodayBudgetPageModule
          ),
      },
      {
        path: 'week',
        loadChildren: () =>
          import('./weekly-budget/weekly-budget.module').then(
            (m) => m.WeeklyBudgetPageModule
          ),
      },
      {
        path: 'month',
        loadChildren: () =>
          import('./monthly-budget/monthly-budget.module').then(
            (m) => m.MonthlyBudgetPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/home/tabs/today',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/tabs/today',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
