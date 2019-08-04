import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { StoreService } from './../../store/index';
import { startWith, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.storeService.getIsLoading();
    this.exercises$ = this.storeService.getAvailableExercises();
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgModel): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
