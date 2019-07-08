import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean;

  constructor() {}

  ngOnInit() {
    this.ongoingTraining = false;
  }

  onTrainingStarted() {
    this.ongoingTraining = true;
  }

  onTrainingExit() {
    this.ongoingTraining = false;
  }
}
