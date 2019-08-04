import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data';
import { UIService } from '../shared/index';
import { StoreService } from './../store/index';
import { TrainingService } from './../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private storeService: StoreService
  ) {}

  initAuthListeners(): void {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.storeService.dispatchAuthenticate();
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.storeService.dispatchUnauthenticate();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.storeService.dispatchStartLoading();
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.storeService.dispatchStopLoading();
      })
      .catch((error: any) => {
        this.storeService.dispatchStopLoading();
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData): void {
    this.storeService.dispatchStartLoading();
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.storeService.dispatchStopLoading();
      })
      .catch((error: any) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }
}
