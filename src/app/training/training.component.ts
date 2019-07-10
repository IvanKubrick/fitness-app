import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean;

  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.ongoingTraining = false;

    this.subscribeToTrainingChange();
  }
  ngDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  onTrainingStarted(): void {
    this.ongoingTraining = true;
  }

  onTrainingExit(): void {
    this.ongoingTraining = false;
  }

  private subscribeToTrainingChange(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise: Exercise) => {
        this.ongoingTraining = !!exercise;
      }
    );
  }
}
