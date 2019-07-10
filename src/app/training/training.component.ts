import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean;

  constructor() {}

  ngOnInit(): void {
    this.ongoingTraining = false;
  }

  onTrainingStarted(): void {
    this.ongoingTraining = true;
  }

  onTrainingExit(): void {
    this.ongoingTraining = false;
  }
}
