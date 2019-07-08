import { Injectable } from '@angular/core';

import { AuthData } from './auth-data';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: String(Math.round(Math.random() * 10000))
    };
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: String(Math.round(Math.random() * 10000))
    };
  }

  logout() {
    this.user = null;
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
