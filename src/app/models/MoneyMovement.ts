import { MoneyMovementType } from './MoneyMovementType';

export interface MoneyMovement {
    id?: string;
    amount: Dinero.Dinero;
    sign: 1 | -1;
    date: Date;
    type: MoneyMovementType;
    description? : string;
}