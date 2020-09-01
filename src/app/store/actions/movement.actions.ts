import { createAction, props } from '@ngrx/store';
import { DateInterval } from 'src/app/components/shared/month-picker/DateInterval';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { CreateMoneyMovementDto } from 'src/app/models/dto/create-money-movement.dto';

export const setMovementsInterval = createAction(
  '[Movement] Set Movements Interval',
  props<{ data: DateInterval }>()
);

export const loadMovements = createAction(
  '[Movement] Load Movements',
  props<{ data: DateInterval }>()
);

export const loadMovementsSuccess = createAction(
  '[Movement] Load Movements Success',
  props<{ data: MoneyMovement[] }>()
);

export const loadMovementsFailure = createAction(
  '[Movement] Load Movements Failure',
  props<{ error: any }>()
);

export const addMovement = createAction(
  '[Movement] Add Movement',
  props<{ data: CreateMoneyMovementDto }>()
);

export const addMovementSuccess = createAction(
  '[Movement] Add Movement Success',
  props<{ data: MoneyMovement }>()
);

export const addMovementFailure = createAction(
  '[Movement] Add Movement Failure',
  props<{ error: any }>()
);

export const cleanUpMovementGroups = createAction(
  '[Movement] Clean Up Movement Groups'
);
