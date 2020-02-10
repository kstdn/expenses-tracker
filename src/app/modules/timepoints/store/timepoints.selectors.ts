import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTimepoints from './timepoints.reducer';

export const selectTimepointsState = createFeatureSelector<fromTimepoints.TimepointsState>(
  fromTimepoints.timepointsStateFeatureKey
);

export const selectTimepoints = createSelector(
  selectTimepointsState,
  state => state.timepoints
);
