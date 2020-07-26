import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { IBudget, Budget } from '../models/budget';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private url = 'https://budget-b43fc.firebaseio.com/budget/';
  private BUDGETS = new BehaviorSubject<Budget[]>([]);

  get budgets() {
    return this.BUDGETS.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  addNewBudget(data: IBudget): Observable<Budget[]> {
    let fetchedUserId: string;
    let generatedId: string;
    let newBudget: Budget;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('Id de usuario no encontrado');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        newBudget = new Budget(
          '',
          fetchedUserId,
          +data.type,
          data.title,
          data.amount,
          data.date
        );
        return this.http.post<{ name: string }>(
          this.url + `${fetchedUserId}.json`,
          {
            ...newBudget,
            id: null,
          }
        );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.budgets;
      }),
      take(1),
      tap((result) => {
        newBudget.id = generatedId;
        this.BUDGETS.next(result.concat(newBudget));
      })
    );
  }

  fetchBudgets(date: string) {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('Usuario no encontrado');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: Budget }>(
          this.url + `${fetchedUserId}.json?orderBy="date"&equalTo="${date}"`
        );
      }),
      map((data) => {
        const budgets = [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            budgets.push(
              new Budget(
                key,
                data[key].userId,
                data[key].type,
                data[key].title,
                data[key].amount,
                data[key].date
              )
            );
          }
        }
        return budgets;
      }),
      tap((budgets) => {
        this.BUDGETS.next(budgets);
      })
    );
  }
}
