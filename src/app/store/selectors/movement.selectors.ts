import { createSelector } from '@ngrx/store';
import * as fromReducers from './../reducers';

export const selectMoneyMovement = (state: fromReducers.State) => state.moneyMovement;

export const selectMoneyMovementInterval = createSelector(
    selectMoneyMovement,
    state => state.interval
);

export const selectMoneyMovements = createSelector(
    selectMoneyMovement,
    state => state.moneyMovements
);

export const selectMoneyMovementGroupsLoading = createSelector(
    selectMoneyMovement,
    state => state.loading
);

export const selectMoneyMovementGroupsLoaded = createSelector(
    selectMoneyMovement,
    state => state.loaded
);