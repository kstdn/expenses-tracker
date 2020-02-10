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
import * as fromNavigation from './navigation.reducer';

export interface State {
  moneyMovement: fromMovement.MoneyMovementState,
  balance: fromBalance.BalanceState
  navigation: fromNavigation.NavigationState
}

export const reducers: ActionReducerMap<State> = {
  moneyMovement: fromMovement.reducer,
  balance: fromBalance.reducer,
  navigation: fromNavigation.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
