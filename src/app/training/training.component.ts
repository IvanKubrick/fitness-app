import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean;

  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ongoingTraining = false;

    this.subscribeToTrainingChange();
  }
  ngDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  private subscribeToTrainingChange(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise: Exercise) => {
        this.ongoingTraining = !!exercise;
        this.changeDetectorRef.markForCheck();
      }
    );
  }
}
