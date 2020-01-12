import { MoneyMovement } from './MoneyMovement';

export interface MoneyMovementGroup {
    moneyMovements: MoneyMovement[];
}

export type MoneyMovementGroups = { [key: string]: MoneyMovementGroup };