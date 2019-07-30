import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { NgModel } from '@angular/forms';

import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from './../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading: boolean = true;

  private subscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }
    );

    this.subscription.add(
      this.uiService.loadingStateChanged.subscribe((value: boolean) => {
        this.isLoading = value;
        this.changeDetectorRef.markForCheck();
      })
    );

    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgModel): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
