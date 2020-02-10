import { Action, createReducer, on } from '@ngrx/store';
import * as TimepointsActions from './timepoints.actions';

export const timepointsStateFeatureKey = 'timepointsState';

export interface TimepointsState {
  timepoints: number[]
}

export const initialState: TimepointsState = {
  timepoints: [5, 21]
};

const timepointsReducer = createReducer(
  initialState,

  on(TimepointsActions.loadTimepoints, state => state),
  on(TimepointsActions.loadTimepointsSuccess, (state, action) => state),
  on(TimepointsActions.loadTimepointsFailure, (state, action) => state),

);

export function reducer(state: TimepointsState | undefined, action: Action) {
  return timepointsReducer(state, action);
}
