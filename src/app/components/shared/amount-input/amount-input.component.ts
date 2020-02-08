import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Precision } from 'src/app/helpers/Constants';
import { SimpleMoney } from 'src/app/models/SimpleMoney';

@Component({
  selector: 'amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent implements OnInit {

  @Input() initialMoney: Partial<SimpleMoney>;
  @Input() isNegative: boolean;
  @Output() moneyChanged = new EventEmitter<SimpleMoney>();
  @Output() isNegativeChanged = new EventEmitter<boolean>();

  amountWholePart: number = 0;
  amountDecimalPart: number = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialMoney && changes.initialMoney.isFirstChange) {
      this.initialMoney = this.initialMoney || { amount: 0 }
      const amountWholePart = this.initialMoney.amount / (Math.pow(10, Precision))
      this.amountWholePart = Math.floor(amountWholePart);
      this.amountDecimalPart = Math.abs(this.initialMoney.amount % (Math.pow(10, Precision)));
    } else if (changes.isNegative) {
      const value = changes.isNegative.currentValue;

      const amountIsNegative = this.amountWholePart < 0;
      if (amountIsNegative !== value) {
        this.amountWholePartChanged(this.amountWholePart * -1);
      }
    }
  }

  amountWholePartChanged($event: number): void {
    this.amountWholePart = $event;
    this.processInputChange();
  }

  amountDecimalPartChanged($event: number): void {
    this.amountDecimalPart = $event;
    this.processInputChange();
  }

  processInputChange() {
    const amountWholePart = this.amountWholePart;
    const amountDecimalPart = Math.abs(this.amountDecimalPart); // abs should not be neccessary
    const sum = (amountWholePart * Math.pow(10, Precision)) + amountDecimalPart;

    if (this.isValid()) {
      this.moneyChanged.emit({
        amount: sum,
        currency: 'BGN',
        precision: Precision
      })

      const isNegative = sum < 0 ? true : false;
      if (isNegative !== this.isNegative) {
        this.isNegativeChanged.emit(isNegative);
      }
    } else {
      this.moneyChanged.emit(null)
    }
  }

  isValid() {
    return this.amountDecimalPart < 100 &&
      this.amountDecimalPart >= 0;
  }

  onFocus($event: FocusEvent) {
    ($event.target as HTMLInputElement).select();
  }

}
