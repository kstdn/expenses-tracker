import { createAction, props } from '@ngrx/store';

export const loadTimepoints = createAction(
  '[Timepoints] Load Timepoints'
);

export const loadTimepointsSuccess = createAction(
  '[Timepoints] Load Timepoints Success',
  props<{ data: number[] }>()
);

export const loadTimepointsFailure = createAction(
  '[Timepoints] Load Timepoints Failure',
  props<{ error: any }>()
);
