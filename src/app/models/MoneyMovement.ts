import { MoneyMovementType } from './MoneyMovementType';

export interface MoneyMovement {
    id?: string;
    accountId?: string;
    amount: number;
    timestamp: Date;
    type: MoneyMovementType;
    description? : string;
}
