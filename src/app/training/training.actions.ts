import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS: string =
  '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS: string =
  '[Training] Set Finished Trainings';
export const START_TRAINING: string = '[Training] Start Traiing';
export const STOP_TRAINING: string = '[Training] Stop Traiing';

export class SetAvailableTrainings implements Action {
  readonly type: string = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type: string = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type: string = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type: string = STOP_TRAINING;
}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
