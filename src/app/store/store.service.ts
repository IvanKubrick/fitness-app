import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromRoot from './app.reducer';
import * as UI from '../shared/ui.actions';
import * as AUTH from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private store: Store<fromRoot.State>) {}

  dispatchStartLoading(): void {
    this.store.dispatch(new UI.StartLoading());
  }

  dispatchStopLoading(): void {
    this.store.dispatch(new UI.StopLoading());
  }

  dispatchAuthenticate(): void {
    this.store.dispatch(new AUTH.SetAuthenticated());
  }

  dispatchUnauthenticate(): void {
    this.store.dispatch(new AUTH.SetUnauthenticated());
  }

  getIsLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getIsLoading);
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuthenticated);
  }
}
