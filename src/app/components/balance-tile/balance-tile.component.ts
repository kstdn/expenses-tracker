import { Component, Input, OnInit } from "@angular/core";
import { Currency } from "dinero.js";
import { DialogsService } from "src/app/services/dialogs.service";
import { MovementsService } from "src/app/services/movements.service";
import { AutoUnsubscribe } from "take-while-alive";
import { LoadingStatus } from 'src/app/models/EntityStatus';
import { formatMoney } from 'src/app/helpers/util';

@Component({
  selector: "balance-tile",
  templateUrl: "./balance-tile.component.html",
  styleUrls: ["./balance-tile.component.scss"],
})
@AutoUnsubscribe()
export class BalanceTileComponent implements OnInit {
  @Input() accountId: string;
  @Input() currency: Currency;

  get currentBalance(): number {
    return this.movementsService.balanceState.item;
  };

  get currentBalanceFormatted(): string {
    return formatMoney(this.currentBalance, this.currency);
  };

  get loading(): boolean {
    return this.movementsService.balanceState.status === LoadingStatus.Loading;
  };

  constructor(
    private dialogsService: DialogsService,
    private movementsService: MovementsService
  ) {}

  ngOnInit() { }

  enterNewBalance() {
    this.dialogsService.openBalanceUpdate(
      this.currentBalance,
      this.accountId,
      this.currency
    );
  }
}
