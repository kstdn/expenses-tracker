import Dinero from 'dinero.js'
import { SimpleMoney } from '../models/SimpleMoney';
import { MoneyMovement } from '../models/MoneyMovement';
import { MoneyMovementGroups, MoneyMovementGroup } from '../models/MoneyMovementGroup';
import { DateInterval } from '../components/shared/month-picker/DateInterval';

export const Money = (simpleDinero: SimpleMoney) => {
    return Dinero(simpleDinero);
};

export const getDate = (timestamp: number): string => {
    const temp = new Date(timestamp);
    temp.setHours(0, 0, 0, 0);
    return `${temp.getTime()}`;
}

export const groupMovementsBy = (movements: MoneyMovement[], groupByProp: keyof MoneyMovement): MoneyMovementGroups => {
    const groupsMap = {} as MoneyMovementGroups;

    for (const movement of movements) {
        addToExistingGroupOrCreate(groupsMap, groupByProp, movement);
    }

    return groupsMap;
}

const getGroupBy = (movement: MoneyMovement, groupByProp: keyof MoneyMovement) => {
    if (groupByProp === 'money' || groupByProp === 'type') return;

    let groupBy: string;
    if (groupByProp === 'timestamp') {
        groupBy = getDate(movement[groupByProp]);
    } else {
        groupBy = movement[groupByProp];
    }
    return groupBy;
}

export const hasOnlyOneGroup = (moneyMovementGroups: MoneyMovementGroups) => {
    return Object.keys(moneyMovementGroups).length === 1;
}

export const addToExistingGroupOrCreate = (moneyMovementGroups: MoneyMovementGroups, groupBy: keyof MoneyMovement, movement: MoneyMovement, movementIndex?: number) => {
    const key = getGroupBy(movement, groupBy);
    let moneyMovementGroup = moneyMovementGroups[key];

    if (moneyMovementGroup) {
        // Update the group
        let moneyMovements;
        if (movementIndex !== undefined) {
            moneyMovementGroup.moneyMovements.splice(movementIndex, 0, movement);
            moneyMovements = moneyMovementGroup.moneyMovements;
        } else {
            moneyMovements = [
                ...moneyMovementGroup.moneyMovements,
                movement
            ]
        }
        moneyMovementGroup = { moneyMovements }
    } else {
        // Create new group
        moneyMovementGroup = { moneyMovements: [movement] };
    }

    // Add to groups object
    moneyMovementGroups[key] = moneyMovementGroup;
}

export const updateInGroup = (movementGroups: MoneyMovementGroups, groupBy: keyof MoneyMovement, updatedMovement: MoneyMovement, interval: DateInterval) => {

    let movement: MoneyMovement;
    let group: MoneyMovementGroup;
    for (const key in movementGroups) {
        if (movementGroups.hasOwnProperty(key)) {
            group = movementGroups[key];
            movement = group.moneyMovements.find(m => m.id === updatedMovement.id);
            if (movement) {
                break;
            }
        }
    }

    const movementIndex = removeFromGroup(movementGroups, groupBy, movement);
    addToExistingGroupOrCreate(movementGroups, groupBy, updatedMovement, movementIndex);
}

export const removeFromGroup = (movementGroups: MoneyMovementGroups, groupBy: keyof MoneyMovement, movement: MoneyMovement): number => {
    const group: MoneyMovementGroup = movementGroups[getGroupBy(movement, groupBy)];

    const index = group.moneyMovements.indexOf(movement);

    // Remove movement from group
    group.moneyMovements = group.moneyMovements.filter(mm => mm.id !== movement.id);

    // Also remove group if this was the last movement inside
    if (group.moneyMovements.length === 0) {
        delete movementGroups[getGroupBy(movement, groupBy)];
    }

    return index;
}

export const isInInterval = (movement: MoneyMovement, interval: DateInterval) => {
    return movement.timestamp >= interval.from.getTime() && movement.timestamp <= interval.to.getTime();
}

export const formatMoney = (simpleMoney: SimpleMoney) => Money(simpleMoney).toFormat('0.00') + 'BGN'