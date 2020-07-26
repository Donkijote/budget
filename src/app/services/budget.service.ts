import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { IBudget, Budget } from '../models/budget';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private url = 'https://budget-b43fc.firebaseio.com/budget.json';
  constructor(private http: HttpClient, private authService: AuthService) {}

  addNewBudget(data: IBudget): Observable<{ name: string }> {
    let fetchedUserId: string;
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
        const newBudget = new Budget(
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
      })
    );
  }
}
