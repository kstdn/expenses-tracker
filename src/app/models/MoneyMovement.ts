import { MoneyMovementType } from './MoneyMovementType';
import { SimpleMoney } from './SimpleMoney';

export interface MoneyMovement {
    id?: string;
    money: SimpleMoney;
    date: Date;
    type: MoneyMovementType;
    description? : string;
}