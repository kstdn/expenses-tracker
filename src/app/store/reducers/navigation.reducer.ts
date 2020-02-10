import { Action, createReducer, on } from '@ngrx/store';

import * as navigationActions from './../actions/navigation.actions';

export const balanceFeatureKey = 'balance';

export interface NavigationState {
  toolbarExpanded: boolean;
}

export const initialState: NavigationState = {
  toolbarExpanded: false
};

const navigationReducer = createReducer(
  initialState,
  on(navigationActions.expandToolbar, (state, action) => {
    return {
      ...state,
      toolbarExpanded: true
    };
  }),
  on(navigationActions.closeToolbar, (state, action) => {
    return {
      ...state,
      toolbarExpanded: false
    };
  }),
  on(navigationActions.toggleToolbar, (state, action) => {
    return {
      ...state,
      toolbarExpanded: !state.toolbarExpanded
    };
  })
);

export function reducer(state: NavigationState | undefined, action: Action) {
  return navigationReducer(state, action);
}
