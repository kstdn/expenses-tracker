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
    if(groupByProp === 'money' || groupByProp === 'type') return;
    
    let groupBy: string;
    if(groupByProp === 'timestamp') {
        groupBy = getDate(movement[groupByProp]);
    } else  {
        groupBy = movement[groupByProp];
    }
    return groupBy;
}

export const addToExistingGroupOrCreate = (movementGroups: MoneyMovementGroups, groupBy: keyof MoneyMovement, movement: MoneyMovement) => {
    let moneyMovementGroup = movementGroups[getGroupBy(movement, groupBy)];
    if(!moneyMovementGroup) {
        moneyMovementGroup = { moneyMovements:[] };
        movementGroups[getGroupBy(movement, groupBy)] = moneyMovementGroup;
    }
    moneyMovementGroup.moneyMovements.push(movement);
}

export const updateInGroup = (movementGroups:MoneyMovementGroups, groupBy: keyof MoneyMovement, updatedMovement: MoneyMovement, interval: DateInterval) => {
    
    let movement: MoneyMovement;
    let group: MoneyMovementGroup;
    for (const key in movementGroups) {
        if (movementGroups.hasOwnProperty(key)) {
            group = movementGroups[key];
            movement = group.moneyMovements.find(m => m.id === updatedMovement.id);
            if(movement) {
                break;
            }
        }
    }

    const oldGroupByValue = getGroupBy(movement, groupBy);
    const newGroupbyValue = getGroupBy(updatedMovement, groupBy)
    
    // Check if group was changed
    if(oldGroupByValue !== newGroupbyValue) {
        removeFromGroup(movementGroups, groupBy, movement);
        if(isInInterval(updatedMovement, interval)) {
            addToExistingGroupOrCreate(movementGroups, groupBy, updatedMovement);
        }
    } else {
        Object.assign(movement, updatedMovement);
    }
}

export const removeFromGroup = (movementGroups:MoneyMovementGroups, groupBy: keyof MoneyMovement, movement: MoneyMovement) => {
    const group: MoneyMovementGroup = movementGroups[getGroupBy(movement, groupBy)];
    
    // Remove movement from group
    group.moneyMovements = group.moneyMovements.filter(mm => mm.id !== movement.id);

    // Also remove group if this was the last movement inside
    if(group.moneyMovements.length === 0) {
        delete movementGroups[getGroupBy(movement, groupBy)];
    }
}

export const isInInterval = (movement: MoneyMovement, interval: DateInterval) => {
    return movement.timestamp >= interval.from.getTime() && movement.timestamp <= interval.to.getTime();
}