import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { StopTrainingComponent } from '../current-training/stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentTrainingComponent implements OnInit {
  progress: number;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.progress = 0;

    this.startOrResumeTimer();
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      StopTrainingComponent,
      {
        data: { progress: this.progress }
      }
    );

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.trainingService.cancelExercixe(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
  private startOrResumeTimer(): void {
    const step: number =
      (this.trainingService.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      this.changeDetectorRef.markForCheck();

      if (this.progress >= 100) {
        this.trainingService.completeExercixe();
        clearInterval(this.timer);
      }
    }, step);
  }
}
