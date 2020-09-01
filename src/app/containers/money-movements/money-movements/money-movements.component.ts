import { Component, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Currency } from 'dinero.js';
import { tap } from "rxjs/operators";
import { hasOnlyOneGroup } from "src/app/helpers/util";
import { LoadingStatus } from "src/app/models/EntityStatus";
import { DialogsService } from "src/app/services/dialogs.service";
import { MovementsService } from "src/app/services/movements.service";
import * as fromStore from "src/app/store";
import { AutoUnsubscribe, takeWhileAlive } from "take-while-alive";
import { DateInterval } from "../../../components/shared/month-picker/DateInterval";

@Component({
  templateUrl: "./money-movements.component.html",
  styleUrls: ["./money-movements.component.scss"],
})
@AutoUnsubscribe()
export class MoneyMovementsComponent {

  get state() {
    return this.movementsService.state;
  }

  get isLoading() {
    return this.state.status === LoadingStatus.Loading;
  }

  get isResolved() {
    return this.state.status === LoadingStatus.Resolved;
  }

  get isResolvedNotFound() {
    return this.state.status === LoadingStatus.ResolvedNotFound;
  }

  get isRejected() {
    return this.state.status === LoadingStatus.Rejected;
  }

  hasOnlyOneGroup = hasOnlyOneGroup;

  constructor(
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.State>,
    private dialogsService: DialogsService,
    private movementsService: MovementsService,
  ) {}

  reload(interval: DateInterval) {
    this.movementsService.loadMovements$(interval, this.accountId)
      .pipe(
        tap(() => {
          setTimeout(() => {
            this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
          });
        }),
        takeWhileAlive(this)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.store.dispatch(fromStore.cleanUpMovementGroups());
  }

  get accountId() {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  get currency(): Currency {
    return this.activatedRoute.snapshot.paramMap.get("currency") as Currency;
  }

  onIntervalChange(interval: DateInterval) {
    this.reload(interval);
  }

  addMovement(): void {
    this.dialogsService.openMovementCrud(this.currency, undefined, this.accountId);
  }
}
