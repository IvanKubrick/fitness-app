import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { StopTrainingComponent } from '../current-training/stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number;
  timer: any;

  @Output() trainingExit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

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
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
  private startOrResumeTimer(): void {
    this.timer = setInterval(() => {
      this.progress += 5;

      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 200);
  }
}
