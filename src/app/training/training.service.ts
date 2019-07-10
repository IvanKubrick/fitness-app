import { Injectable } from '@angular/core';

import { Exercise } from './exercise.model';

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

  getAvailableExercises(): Exercise[] {
    return [...this.availableExercisses];
  }
}
