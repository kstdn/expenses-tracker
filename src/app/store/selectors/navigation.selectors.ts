import { createSelector } from '@ngrx/store';
import * as fromReducers from './../reducers';

export const selectNavigation = (state: fromReducers.State) => state.navigation;

export const selectToolbarExpanded = createSelector(
    selectNavigation,
    state => state.toolbarExpanded
);