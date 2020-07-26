import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { IBudget, Budget } from '../models/budget';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private url = 'https://budget-b43fc.firebaseio.com/budget.json';
  private BUDGET = new BehaviorSubject<Budget[]>([]);

  get budgets() {
    return this.BUDGET.asObservable();
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
        return this.http.post<{ name: string }>(this.url, {
          ...newBudget,
          id: null,
        });
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.budgets;
      }),
      take(1),
      tap((result) => {
        newBudget.id = generatedId;
        this.BUDGET.next(result.concat(newBudget));
      })
    );
  }
}
