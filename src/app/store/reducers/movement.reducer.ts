import { Action, createReducer, on } from '@ngrx/store';
import { MoneyMovementGroups } from 'src/app/models/MoneyMovementGroup';
import * as movementActions from './../actions/movement.actions'
import { DateInterval } from 'src/app/components/shared/month-picker/DateInterval';
import { startOfMonth, endOfMonth } from 'date-fns';

export const movementFeatureKey = 'movement';

export interface MoneyMovementState {
  interval: DateInterval,
  moneyMovementGroups: MoneyMovementGroups,
  loading: boolean,
  loaded: boolean
}

export const initialState: MoneyMovementState = {
  interval: {
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  },
  moneyMovementGroups: {},
  loading: false,
  loaded: false
};

const movementReducer = createReducer(
  initialState,
  on(movementActions.setMovementsInterval, (state, action) => {
    return {
      ...state,
      interval: action.data
    };
  }),
  on(movementActions.loadMovementGroups, (state, action) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),
  on(movementActions.loadMovementGroupsSuccess, (state, action) => {
    return {
      ...state,
      moneyMovementGroups: action.data,
      loaded: true,
      loading: false,
    };
  }),
  on(movementActions.cleanUpMovementGroups, (state, action) => {
    return {
      ...state,
      moneyMovementGroups: {}
    };
  })
);

export function reducer(state: MoneyMovementState | undefined, action: Action) {
  return movementReducer(state, action);
}
