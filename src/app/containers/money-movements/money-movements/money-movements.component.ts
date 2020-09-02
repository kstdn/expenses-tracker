import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Currency } from 'dinero.js';
import { tap } from "rxjs/operators";
import { hasOnlyOneGroup } from "src/app/helpers/util";
import { LoadingStatus } from "src/app/models/EntityStatus";
import { DialogsService } from "src/app/services/dialogs.service";
import { MovementsService } from "src/app/services/movements.service";
import { AutoUnsubscribe, takeWhileAlive } from "take-while-alive";
import { DateInterval } from "../../../components/shared/month-picker/DateInterval";

@Component({
  templateUrl: "./money-movements.component.html",
  styleUrls: ["./money-movements.component.scss"],
})
@AutoUnsubscribe()
export class MoneyMovementsComponent {

  @ViewChild('moneyMovementsGroupContainer', { static: false }) moneyMovementsGroupContainer: ElementRef<HTMLDivElement>;

  get state() {
    return this.movementsService.movementsState;
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
    private activatedRoute: ActivatedRoute,
    private dialogsService: DialogsService,
    private movementsService: MovementsService,
  ) {}

  ngOnInit() {
    this.movementsService.loadAccountData$(this.accountId).subscribe();
  }

  reloadMoneyMovements(interval: DateInterval) {
    this.movementsService.loadMovements$(interval, this.accountId)
      .pipe(
        tap(() => {
          setTimeout(() => {
            this.moneyMovementsGroupContainer.nativeElement.scrollTo({
              top: this.moneyMovementsGroupContainer.nativeElement.scrollHeight,
              behavior: 'smooth',
            });
          });
        }),
        takeWhileAlive(this)
      )
      .subscribe();
  }

  get accountId() {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  get currency(): Currency {
    return this.activatedRoute.snapshot.paramMap.get("currency") as Currency;
  }

  onIntervalChange(interval: DateInterval) {
    this.reloadMoneyMovements(interval);
  }

  addMovement(): void {
    this.dialogsService.openMovementCrud(this.currency, undefined, this.accountId);
  }
}
