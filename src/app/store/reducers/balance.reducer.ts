import { Action, createReducer, on } from '@ngrx/store';
import { SimpleMoney } from 'src/app/models/SimpleMoney';

import * as balanceActions from './../actions/balance.actions';

export const balanceFeatureKey = 'balance';

export interface BalanceState {
  balance: SimpleMoney,
  loading: boolean,
  loaded: boolean
}

export const initialState: BalanceState = {
  balance: {
    amount: 0,
    currency: 'BGN',
    precision: 2
  },
  loading: false,
  loaded: true
};

const balanceReducer = createReducer(
  initialState,
  on(balanceActions.loadBalance, (state, action) => {
    return {
      ...state,
      loaded: false,
      loading: true
    };
  }),
  on(balanceActions.loadBalanceSuccess, (state, action) => {
    return {
      ...state,
      balance: action.data,
      loaded: true,
      loading: false
    };
  })
);

export function reducer(state: BalanceState | undefined, action: Action) {
  return balanceReducer(state, action);
}
