import Dinero, { Currency } from "dinero.js";
import { DateInterval } from "../components/shared/month-picker/DateInterval";
import { MoneyMovement } from "../models/MoneyMovement";
import { MoneyMovementGroup, MoneyMovementGroups } from "../models/MoneyMovementGroup";
import { Precision } from "./Constants";

export const Money = (amount: number, currency: Currency) =>
  Dinero({
    amount,
    currency,
    precision: Precision,
  });

export const getDate = (timestamp: Date): string => {
  const temp = new Date(timestamp);
  temp.setHours(0, 0, 0, 0);
  return `${temp.getTime()}`;
};

export const groupMovementsBy = (
  movements: MoneyMovement[],
  groupByProp: keyof MoneyMovement
): MoneyMovementGroups => {
  const groupsMap = {} as MoneyMovementGroups;

  for (const movement of movements) {
    addToExistingGroupOrCreate(groupsMap, groupByProp, movement);
  }

  return groupsMap;
};

const getGroupBy = (
  movement: MoneyMovement,
  groupByProp: keyof MoneyMovement
) => {
  if (groupByProp === "amount" || groupByProp === "type" || groupByProp === "category") return;

  let groupBy: string;
  if (groupByProp === "timestamp") {
    groupBy = getDate(movement[groupByProp]);
  } else {
    groupBy = movement[groupByProp];
  }
  return groupBy;
};

export const hasOnlyOneGroup = (moneyMovementGroups: MoneyMovementGroups) => {
  return Object.keys(moneyMovementGroups).length === 1;
};

export const addToExistingGroupOrCreate = (
  moneyMovementGroups: MoneyMovementGroups,
  groupBy: keyof MoneyMovement,
  movement: MoneyMovement
) => {
  const key = getGroupBy(movement, groupBy);
  let moneyMovementGroup = moneyMovementGroups[key];

  if (moneyMovementGroup) {
    // Update the group
    moneyMovementGroup = {
      moneyMovements: [...moneyMovementGroup.moneyMovements, movement],
    };
  } else {
    // Create new group
    moneyMovementGroup = { moneyMovements: [movement] };
  }

  // Add to groups object
  moneyMovementGroups[key] = moneyMovementGroup;

  return moneyMovementGroups;
};

export const updateInGroup = (
  movementGroups: MoneyMovementGroups,
  groupBy: keyof MoneyMovement,
  updatedMovement: MoneyMovement
) => {
  let movement: MoneyMovement;
  let group: MoneyMovementGroup;
  for (const key in movementGroups) {
    if (movementGroups.hasOwnProperty(key)) {
      group = movementGroups[key];
      movement = group.moneyMovements.find((m) => m.id === updatedMovement.id);
      if (movement) {
        break;
      }
    }
  }

  const movementIndex = removeFromGroup(movementGroups, groupBy, movement);
  addToExistingGroupOrCreate(movementGroups, groupBy, updatedMovement);
};

export const removeFromGroup = (
  movementGroups: MoneyMovementGroups,
  groupBy: keyof MoneyMovement,
  movement: MoneyMovement
): number => {
  const group: MoneyMovementGroup =
    movementGroups[getGroupBy(movement, groupBy)];

  const index = group.moneyMovements.indexOf(movement);

  // Remove movement from group
  group.moneyMovements = group.moneyMovements.filter(
    (mm) => mm.id !== movement.id
  );

  // Also remove group if this was the last movement inside
  if (group.moneyMovements.length === 0) {
    delete movementGroups[getGroupBy(movement, groupBy)];
  }

  return index;
};

export const isInInterval = (
  movement: MoneyMovement,
  interval: DateInterval
) => {
  return (
    movement.timestamp >= interval.from && movement.timestamp <= interval.to
  );
};

export const formatMoney = (amount: number, currency: Currency) =>
  Money(amount, currency).toFormat("0.00") + currency;
