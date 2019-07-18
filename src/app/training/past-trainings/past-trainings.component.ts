import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedAndCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterTable(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
