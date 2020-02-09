import { createAction, props } from '@ngrx/store';
import { SimpleMoney } from 'src/app/models/SimpleMoney';

export const loadBalance = createAction(
  '[Balance] Load Balance'
);

export const loadBalanceSuccess = createAction(
  '[Balance] Load Balance Success',
  props<{ data: SimpleMoney }>()
);

export const loadBalanceFailure = createAction(
  '[Balance] Load Balance Failure',
  props<{ error: any }>()
);
