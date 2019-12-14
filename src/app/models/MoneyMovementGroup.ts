import { MoneyMovement } from './MoneyMovement';

export interface MoneyMovementGroup {
    moneyMovements: MoneyMovement[];
}

export type MoneyMovementGroups<T extends string|number> = { [key in T]: MoneyMovementGroup };