import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { NgModel } from '@angular/forms';

import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];

  private subscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.subscription = this.trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }
    );

    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onStartTraining(form: NgModel): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
