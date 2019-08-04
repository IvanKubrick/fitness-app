import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { StoreService } from './../../store/index';

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
    this.isLoading$ = this.storeService.getIsLoading().pipe(shareReplay());
    this.exercises$ = this.storeService
      .getAvailableExercises()
      .pipe(shareReplay());
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
