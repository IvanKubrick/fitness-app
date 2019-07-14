import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PastTrainingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
