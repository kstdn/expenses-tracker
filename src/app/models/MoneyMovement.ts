import { MoneyMovementType } from './MoneyMovementType';
import { SimpleMoney } from './SimpleMoney';

export interface MoneyMovement {
    id?: string;
    money: SimpleMoney;
    timestamp: string;
    type: MoneyMovementType;
    description? : string;
}