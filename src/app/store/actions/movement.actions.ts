import { createAction, props } from '@ngrx/store';
import { MoneyMovementGroups } from 'src/app/models/MoneyMovementGroup';
import { DateInterval } from 'src/app/components/shared/month-picker/DateInterval';

export const setMovementsInterval = createAction(
  '[Movement] Set Movements Interval',
  props<{ data: DateInterval }>()
);

export const loadMovementGroups = createAction(
  '[Movement] Load Movement Groups',
  props<{ data: DateInterval }>()
);

export const loadMovementGroupsSuccess = createAction(
  '[Movement] Load Movement Groups Success',
  props<{ data: MoneyMovementGroups }>()
);

export const loadMovementGroupsFailure = createAction(
  '[Movement] Load Movement Groups Failure',
  props<{ error: any }>()
);

export const cleanUpMovementGroups = createAction(
  '[Movement] Clean Up Movement Groups'
);
