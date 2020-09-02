import {
  addMonths,
  closestTo,
  differenceInDays,
  isAfter,
  isToday,
  startOfDay,
} from "date-fns";
import { Timepoint } from "src/app/models/Timepoint";

export const getNextTimepoint = (timepoints: Timepoint[]) => {
  const today = new Date();

  const possibleNextTimepointsThisMonth = timepoints
    .map((tp) => {
      const date = new Date();
      date.setDate(tp.date);
      return startOfDay(date);
    })
    .filter((date) => isToday(date) || isAfter(date, today));

  const possibleNextTimepointsNextMonth = timepoints.map((tp) => {
    const date = new Date();
    date.setDate(tp.date);
    return startOfDay(addMonths(date, 1));
  });

  const allPossibleNextTimepoints: Date[] = [
    ...possibleNextTimepointsThisMonth,
    ...possibleNextTimepointsNextMonth,
  ];

  if (!allPossibleNextTimepoints.length) return;

  return closestTo(new Date(), allPossibleNextTimepoints);
}

export const getRemainingDays = (timepoints: Timepoint[], relativeTo: Date) => {
  if(timepoints.length === 0) return;
  const nextTimepoint = getNextTimepoint(timepoints);
  return differenceInDays(nextTimepoint, relativeTo) + 1;
}

export const getDailyBudgetAmount = (
  remainingDays: number | undefined,
  balance: number | undefined,
): number => {
  if(remainingDays=== undefined || balance === undefined) return;
  return Math.floor(balance / remainingDays);
};
