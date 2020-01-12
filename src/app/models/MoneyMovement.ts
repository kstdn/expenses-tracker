import { MoneyMovementType } from './MoneyMovementType';
import { SimpleMoney } from './SimpleMoney';

export interface MoneyMovement {
    id?: string;
    money: SimpleMoney;
    timestamp: number;
    type: MoneyMovementType;
    description? : string;
}