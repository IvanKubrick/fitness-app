import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from './../shared/ui.service';
import { StoreService } from '../store/index';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private storeService: StoreService
  ) {}

  fetchAvailableExercises(): void {
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray: any[]) =>
            docArray.map((doc: any) => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            })
          )
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.storeService.dispatchStopLoading();
            this.storeService.dispatchAvailableTrainings(exercises);
          },
          () => {
            this.storeService.dispatchStopLoading();
            this.uiService.showSnackbar(
              'Fetching exercises failed. Please, try again later',
              null,
              3000
            );
            this.storeService.dispatchAvailableTrainings([]);
          }
        )
    );
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  startExercise(exerciseId: string): void {
    this.storeService.dispatchStartTraining(exerciseId);
  }

  completeExercixe(): void {
    this.addDatatoDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.storeService.dispatchStopTraining();
  }

  cancelExercixe(progress: number): void {
    this.addDatatoDatabase({
      ...this.runningExercise,
      duration: (this.runningExercise.duration * progress) / 100,
      calories: (this.runningExercise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled'
    });
    this.storeService.dispatchStopTraining();
  }

  fetchCompletedAndCancelledExercises(): void {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.storeService.dispatchFinishedTrainings(exercises);
          },
          () => {}
        )
    );
  }

  cancelSubscriptions(): void {
    if (this.fbSubs && this.fbSubs.length) {
      this.fbSubs.forEach((subscription: Subscription) =>
        subscription.unsubscribe()
      );
    }
  }

  private addDatatoDatabase(execise: Exercise): void {
    this.db.collection('finishedExercises').add(execise);
  }
}
