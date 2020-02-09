import { createSelector } from '@ngrx/store';
import * as fromReducers from './../reducers';

export const selectBalance = (state: fromReducers.State) => state.balance;

export const selectMovementBalance = createSelector(
    selectBalance,
    state => state.balance
);

export const selectBalanceLoading = createSelector(
    selectBalance,
    state => state.loading
);

export const selectBalanceLoaded = createSelector(
    selectBalance,
    state => state.loaded
);