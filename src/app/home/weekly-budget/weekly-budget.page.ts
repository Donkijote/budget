import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Subscription } from 'rxjs';
import { Budget } from '../../models/budget';

@Component({
  selector: 'app-weekly-budget',
  templateUrl: './weekly-budget.page.html',
  styleUrls: ['./weekly-budget.page.scss'],
})
export class WeeklyBudgetPage implements OnInit, OnDestroy {
  private budgetSub: Subscription;
  loadedBudgets: Budget[];
  title = new Date();
  isLoading = false;
  dateFrom: string;
  dateTo: string;
  totalIn: number;
  totalOut: number;
  totalSum: number;
  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    const curr = new Date(); // get current date
    const first = curr.getDate() + 1 - (curr.getDay() ? curr.getDay() : 7); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    this.dateFrom = new Date(curr.setDate(first)).toISOString().split('T')[0];
    this.dateTo = new Date(curr.setDate(last)).toISOString().split('T')[0];

    this.budgetSub = this.budgetService.budgets.subscribe((budgets) => {
      this.loadedBudgets = budgets;
      let inc = 0;
      let out = 0;

      for (const i of budgets) {
        if (i.type === 1) {
          inc += i.amount;
        } else if (i.type === 2) {
          out += i.amount;
        }
      }

      this.totalIn = inc;
      this.totalOut = out;
      this.totalSum = inc - out;
    });
  }

  ngOnDestroy(): void {
    if (this.budgetSub) {
      this.budgetSub.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.budgetService
      .fetchBudgets(this.dateTo, this.dateFrom)
      .subscribe(() => {
        this.isLoading = false;
      });
  }
}
