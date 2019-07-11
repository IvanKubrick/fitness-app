import { Injectable } from '@angular/core';

import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercisses: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch toes', duration: 180, calories: 30 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 20 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise;

  exerciseChanged: Subject<Exercise> = new Subject<Exercise>();

  getAvailableExercises(): Exercise[] {
    return [...this.availableExercisses];
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  startExercise(exerciseId: string): void {
    const selectedExercise: Exercise = this.availableExercisses.find(
      (exercise: Exercise) => exercise.id === exerciseId
    );

    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...selectedExercise });
  }
}
