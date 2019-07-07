import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number;
  interval: any;

  constructor() {}

  ngOnInit() {
    this.progress = 0;
    this.interval = setInterval(() => {
      this.progress += 5;

      if (this.progress >= 100) {
        clearInterval(this.interval);
      }
    }, 200);
  }

  onStop() {
    clearInterval(this.interval);
  }
}
