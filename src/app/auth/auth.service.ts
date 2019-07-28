import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';

import { AuthData } from './auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar
  ) {}

  initAuthListeners(): void {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .catch((error: any) => {
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  login(authData: AuthData): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .catch((error: any) => {
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
