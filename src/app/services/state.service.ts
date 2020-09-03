import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable, of, throwError } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { DateInterval } from "../components/shared/month-picker/DateInterval";
import {
  addToExistingGroupOrCreate,
  groupMovementsBy,
  isInInterval,
  removeFromGroup,
  updateInGroup,
} from "../helpers/util";
import { CreateMoneyMovementDto } from "../models/dto/create-money-movement.dto";
import {
  CollectionLoadingStatus,
  EntityCollectionState,
  EntityState,
  LoadingStatus,
} from "../models/EntityStatus";
import { MoneyMovement } from "../models/MoneyMovement";
import { MoneyMovementGroups } from "../models/MoneyMovementGroup";
import { Timepoint } from "../models/Timepoint";
import { ServerService } from "./server.service";

@Injectable({
  providedIn: "root",
})
export class State {
  interval: DateInterval;
  groupBy: keyof MoneyMovement = "timestamp";

  movementsState$: BehaviorSubject<EntityState<MoneyMovementGroups>> = new BehaviorSubject({
    status: LoadingStatus.Idle,
    value: {},
  });

  balanceState$: BehaviorSubject<EntityState<number>> = new BehaviorSubject({
    status: LoadingStatus.Idle,
    value: undefined,
  });

  timepointsState$: BehaviorSubject<
    EntityCollectionState<Timepoint>
  > = new BehaviorSubject({
    status: CollectionLoadingStatus.Idle,
    values: [],
  });

  constructor(private serverService: ServerService) {}

  setGroupingCriteria(groupBy: keyof MoneyMovement) {
    this.groupBy = groupBy;
  }

  loadAccountData$(accountId: string) {
    return forkJoin(
      this.loadBalance$(accountId),
      this.loadTimepoints$(accountId)
    );
  }

  loadMovements$(interval: DateInterval, accountId: string) {
    this.interval = interval;
    this.movementsState$.next({
      ...this.movementsState$.value,
      status: LoadingStatus.Loading,
    })
    return this.serverService.getAllMovements(accountId, interval).pipe(
      map((data) => data.items),
      tap((data) => {
        if (data.length === 0) {
          this.movementsState$.next({
            ...this.movementsState$.value,
            status: LoadingStatus.ResolvedNotFound,
            value: {},
          })
        } else {
          this.movementsState$.next({
            ...this.movementsState$.value,
            status: LoadingStatus.Resolved,
            value: groupMovementsBy(data, "timestamp"),
          })
        }
      }),
      catchError((e) => {
        this.movementsState$.next({
          ...this.movementsState$.value,
          status: LoadingStatus.Rejected,
        })
        return throwError(e);
      })
    );
  }

  addMovement$(movement: CreateMoneyMovementDto) {
    return this.serverService.addMovement(movement).pipe(
      tap((created) => {
        addToExistingGroupOrCreate(
          this.movementsState$.value.value,
          this.groupBy,
          created
        );
      }),
      mergeMap(() => this.loadBalance$(movement.accountId))
    );
  }

  updateMovement$(movement: MoneyMovement) {
    return this.serverService.updateMovement(movement).pipe(
      tap((updatedMovement) => {
        if (isInInterval(updatedMovement, this.interval)) {
          updateInGroup(
            this.movementsState$.value.value,
            this.groupBy,
            updatedMovement
          );
        } else {
          removeFromGroup(
            this.movementsState$.value.value,
            this.groupBy,
            updatedMovement
          );
        }
      }),
      mergeMap(() => this.loadBalance$(movement.accountId))
    );
  }

  deleteMovement$(movement: MoneyMovement): Observable<void> {
    return this.serverService.deleteMovement(movement.id).pipe(
      tap(() => {
        removeFromGroup(this.movementsState$.value.value, this.groupBy, movement);
      }),
      mergeMap(() => this.loadBalance$(movement.accountId))
    );
  }

  loadBalance$(accountId: string): Observable<void> {
    this.balanceState$.next({
      ...this.balanceState$.value,
      status: LoadingStatus.Loading,
    });
    return this.serverService.getAccountBalance(accountId).pipe(
      tap((balance) => {
        this.balanceState$.next({
          ...this.balanceState$.value,
          value: balance,
          status: LoadingStatus.Resolved,
        });
      }),
      catchError((error) => {
        this.balanceState$.next({
          ...this.balanceState$.value,
          status: LoadingStatus.Rejected,
        });
        return of(error);
      }),
      map(() => {})
    );
  }

  loadTimepoints$(accountId: string) {
    this.timepointsState$.next({
      ...this.timepointsState$.value,
      status: CollectionLoadingStatus.Loading,
    });
    return this.serverService.getTimepoints(accountId).pipe(
      tap((timepoints) => {
        this.timepointsState$.next({
          ...this.timepointsState$.value,
          values: timepoints,
          status: timepoints.length
            ? CollectionLoadingStatus.Resolved
            : CollectionLoadingStatus.ResolvedEmpty,
        });
      }),
      catchError((error) => {
        this.timepointsState$.next({
          ...this.timepointsState$.value,
          status: CollectionLoadingStatus.Loading,
        });
        return of(error);
      })
    );
  }
}
