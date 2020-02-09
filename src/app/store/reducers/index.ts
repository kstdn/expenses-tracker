import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromMovement from './movement.reducer';
import * as fromBalance from './balance.reducer';

export interface State {
  moneyMovement: fromMovement.MoneyMovementState,
  balance: fromBalance.BalanceState
}

export const reducers: ActionReducerMap<State> = {
  moneyMovement: fromMovement.reducer,
  balance: fromBalance.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
