import { Component, Input, OnInit } from "@angular/core";
import { Currency } from "dinero.js";
import { tap } from "rxjs/operators";
import { formatMoney } from "src/app/helpers/util";
import { MovementsService } from "src/app/services/movements.service";
import { AutoUnsubscribe, takeWhileAlive } from "take-while-alive";
import { getDailyBudgetAmount, getRemainingDays } from "./util";
import { forkJoin, merge, combineLatest } from 'rxjs';

@Component({
  selector: "daily-budget-tile",
  templateUrl: "./daily-budget-tile.component.html",
  styleUrls: ["./daily-budget-tile.component.scss"],
})
@AutoUnsubscribe()
export class DailyBudgetTileComponent implements OnInit {
  @Input() currency: Currency;

  dailyBudgetAmount: number;
  remainingDays: number;

  get dailyBudgetFormatted() {
    return this.dailyBudgetAmount !== undefined
      ? formatMoney(this.dailyBudgetAmount, this.currency)
      : "";
  }

  get remainingDaysFormatted() {
    const plural = this.remainingDays > 1;
    return this.remainingDays !== undefined
      ? `${this.remainingDays} day${plural ? 's': ''} left`
      : "";
  }

  constructor(private movementsService: MovementsService) {}

  ngOnInit() {
    combineLatest(
      this.movementsService.timepointsState$,
      this.movementsService.balanceState$,
    ).pipe(
        tap(([timepointsState, balanceState]) => {
          this.remainingDays = getRemainingDays(timepointsState.items, new Date());
          this.dailyBudgetAmount = getDailyBudgetAmount(
            this.remainingDays,
            balanceState.item,
          );
        }),
        takeWhileAlive(this)
      )
      .subscribe();
  }
}
