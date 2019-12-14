import Dinero from 'dinero.js'
import { SimpleMoney } from '../models/SimpleMoney';
import { MoneyMovement } from '../models/MoneyMovement';
import { MoneyMovementGroups } from '../models/MoneyMovementGroup';

export const Money = (simpleDinero: SimpleMoney) => {
    return Dinero(simpleDinero);
};

export const getDate = (dateString: string): string => {
    const temp = new Date(dateString);
    temp.setHours(0, 0, 0, 0);
    return temp.toISOString();
}

export const groupMovementsBy = <T extends string|number>(movements: MoneyMovement[], groupByProp: keyof MoneyMovement): MoneyMovementGroups<T> => {
    const groupsMap = {} as MoneyMovementGroups<T>;

    
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

    for (const movement of movements) {
        let moneyMovementGroup = groupsMap[getGroupBy(movement, groupByProp)];
        if(!moneyMovementGroup) {
            moneyMovementGroup = { moneyMovements:[] };
            groupsMap[getGroupBy(movement, groupByProp)] = moneyMovementGroup;
        }
        moneyMovementGroup.moneyMovements.push(movement);
    }

    return groupsMap;
}