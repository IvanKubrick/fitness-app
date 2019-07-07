import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStarted: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onStartTraining() {
    this.trainingStarted.emit();
  }
}
