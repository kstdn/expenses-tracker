import { Action, createReducer, on } from '@ngrx/store';
import * as movementActions from './../actions/movement.actions'
import { DateInterval } from 'src/app/components/shared/month-picker/DateInterval';
import { startOfMonth, endOfMonth } from 'date-fns';
import { isInInterval } from 'src/app/helpers/util';
import { MoneyMovement } from 'src/app/models/MoneyMovement';

export const movementFeatureKey = 'movement';

export interface MoneyMovementState {
  interval: DateInterval,
  moneyMovements: MoneyMovement[],
  loading: boolean,
  loaded: boolean
}

export const initialState: MoneyMovementState = {
  interval: {
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  },
  moneyMovements: [],
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
  on(movementActions.loadMovements, (state, action) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),
  on(movementActions.loadMovementsSuccess, (state, action) => {
    return {
      ...state,
      moneyMovements: action.data,
      loaded: true,
      loading: false,
    };
  }),
  on(movementActions.addMovementSuccess, (state, action) => {
    const movement = action.data;
    const interval = state.interval;

    if (isInInterval(movement, interval)) {
      return {
        ...state,
        moneyMovements: [movement, ...state.moneyMovements]
      };
    }
    
    return state;
  }),
  on(movementActions.cleanUpMovementGroups, (state, action) => {
    return {
      ...state,
      moneyMovements: []
    };
  })
);

export function reducer(state: MoneyMovementState | undefined, action: Action) {
  return movementReducer(state, action);
}
