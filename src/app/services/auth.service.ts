import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USER_IS_AUTTHENTICATED = false;
  private userId = 'abc';

  get userIsAuthenticated() {
    return this.USER_IS_AUTTHENTICATED;
  }

  get user() {
    return this.userId;
  }

  constructor() {}

  login() {
    this.USER_IS_AUTTHENTICATED = true;
  }

  logout() {
    this.USER_IS_AUTTHENTICATED = false;
  }
}
