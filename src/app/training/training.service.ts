import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from './../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged: Subject<Exercise> = new Subject<Exercise>();
  exercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();
  finishedExercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

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
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          () => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              'Fetching exercises failed. Please, try again later',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  startExercise(exerciseId: string): void {
    const selectedExercise: Exercise = this.availableExercises.find(
      (exercise: Exercise) => exercise.id === exerciseId
    );

    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...selectedExercise });
  }

  completeExercixe(): void {
    this.addDatatoDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercixe(progress: number): void {
    this.addDatatoDatabase({
      ...this.runningExercise,
      duration: (this.runningExercise.duration * progress) / 100,
      calories: (this.runningExercise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedAndCancelledExercises(): void {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
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
