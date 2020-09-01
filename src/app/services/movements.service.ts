import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { DateInterval } from "../components/shared/month-picker/DateInterval";
import { addToExistingGroupOrCreate, groupMovementsBy, isInInterval, removeFromGroup, updateInGroup } from "../helpers/util";
import { CreateMoneyMovementDto } from "../models/dto/create-money-movement.dto";
import { EntityState, LoadingStatus } from "../models/EntityStatus";
import { MoneyMovement } from "../models/MoneyMovement";
import { MoneyMovementGroups } from "../models/MoneyMovementGroup";
import { ServerService } from "./server.service";

@Injectable({
  providedIn: "root",
})
export class MovementsService {
  interval: DateInterval;
  groupBy: keyof MoneyMovement = "timestamp";

  state: EntityState<MoneyMovementGroups> = {
    status: LoadingStatus.Idle,
    item: {},
  };

  balanceState: EntityState<number> = {
    status: LoadingStatus.Idle,
    item: 0,
  };

  constructor(private serverService: ServerService) {}

  setGroupingCriteria(groupBy: keyof MoneyMovement) {
    this.groupBy = groupBy;
  }

  loadMovements$(interval: DateInterval, accountId: string) {
    this.state.status = LoadingStatus.Loading;
    return this.serverService.getAllMovements(accountId, interval).pipe(
      map((data) => data.items),
      tap((data) => {
        if (data.length === 0) {
          this.state.status = LoadingStatus.ResolvedNotFound;
          this.state.item = {};
        } else {
          this.state.status = LoadingStatus.Resolved;
        }
      }),
      map((data) => (this.state.item = groupMovementsBy(data, "timestamp"))),
      tap(() => (this.interval = interval)),
      tap(() => this.loadBalance$(accountId)),
      catchError((e) => {
        this.state.status = LoadingStatus.Rejected;
        return throwError(e);
      })
    );
  }

  addMovement$(movement: CreateMoneyMovementDto) {
    return this.serverService.addMovement(movement).pipe(
      tap((created) => {
        addToExistingGroupOrCreate(this.state.item, this.groupBy, created);
      }),
      tap(() => this.loadBalance$(movement.accountId)),
    );
  }

  updateMovement$(movement: MoneyMovement) {
    return this.serverService.updateMovement(movement).pipe(
      tap((updatedMovement) => {
        if (isInInterval(updatedMovement, this.interval)) {
          updateInGroup(this.state.item, this.groupBy, updatedMovement);
        } else {
          removeFromGroup(this.state.item, this.groupBy, updatedMovement);
        }
      }),
      tap(() => this.loadBalance$(movement.accountId)),
    );
  }

  deleteMovement$(movement: MoneyMovement): Observable<void> {
    return this.serverService.deleteMovement(movement.id).pipe(
      tap(() => {
        removeFromGroup(this.state.item, this.groupBy, movement);
      }),
      tap(() => this.loadBalance$(movement.accountId)),
    );
  }

  loadBalance$(accountId: string) {
    this.balanceState.status = LoadingStatus.Loading;
    return this.serverService
      .getAccountBalance(accountId)
      .pipe(
        tap((balance) => {
          this.balanceState.item = balance;
        }),
        catchError(() => (this.balanceState.status = LoadingStatus.Rejected)),
        finalize(() => (this.balanceState.status = LoadingStatus.Resolved))
      )
      .subscribe();
  }
}
