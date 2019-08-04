import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromRoot from './app.reducer';
import * as fromTraining from '../training/training.reducer';
import * as UI from '../shared/ui.actions';
import * as AUTH from '../auth/auth.actions';
import * as TRAINING from '../training/training.actions';
import { Exercise } from '../training/exercise.model';

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

  dispatchAvailableTrainings(exerecises: Exercise[]): void {
    this.store.dispatch(new TRAINING.SetAvailableTrainings(exerecises));
  }

  dispatchFinishedTrainings(exerecises: Exercise[]): void {
    this.store.dispatch(new TRAINING.SetFinishedTrainings(exerecises));
  }

  dispatchStartTraining(exereciseId: string): void {
    this.store.dispatch(new TRAINING.StartTraining(exereciseId));
  }

  dispatchStopTraining(): void {
    this.store.dispatch(new TRAINING.StopTraining());
  }

  getIsLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getIsLoading);
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuthenticated);
  }

  getIsTraining(): Observable<boolean> {
    return this.store.select(fromTraining.getIsTraining);
  }

  getAvailableExercises(): Observable<Exercise[]> {
    return this.store.select(fromTraining.getAvailableExercises);
  }

  getFinishedExercises(): Observable<Exercise[]> {
    return this.store.select(fromTraining.getFinishedExercises);
  }

  getActiveTraining(): Observable<Exercise> {
    return this.store.select(fromTraining.getActiveTraining);
  }
}
