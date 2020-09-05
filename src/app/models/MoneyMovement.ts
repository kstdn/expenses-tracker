import { MoneyMovementType } from './MoneyMovementType';
import { Category } from './Category';

export interface MoneyMovement {
    id?: string;
    accountId?: string;
    amount: number;
    timestamp: Date;
    type: MoneyMovementType;
    description? : string;
    category: Category;
    categoryId: string;
}
