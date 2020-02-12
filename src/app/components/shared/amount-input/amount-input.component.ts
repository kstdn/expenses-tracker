import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Precision } from 'src/app/helpers/Constants';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent {

  @Input() initialMoney: Partial<SimpleMoney>;
  @Output() moneyChanged = new EventEmitter<SimpleMoney>();
  
  form: FormGroup;

  amountWholePart: number = 0;
  amountDecimalPart: number = 0;

  ngOnInit() {
    this.form = new FormGroup({
      'amountWholePart': new FormControl(this.amountWholePart),
      'amountDecimalPart': new FormControl(this.amountDecimalPart)
    })

    this.form.controls.amountWholePart.valueChanges
      .subscribe(value => {
        this.amountWholePartChanged(value);
      });

    this.form.controls.amountDecimalPart.valueChanges
      .subscribe(value => {
        this.amountDecimalPartChanged(value);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialMoney && changes.initialMoney.isFirstChange) {
      this.initialMoney = this.initialMoney || { amount: 0 }
      const amountWholePart = this.initialMoney.amount / (Math.pow(10, Precision))
      this.amountWholePart = Math.floor(amountWholePart);
      this.amountDecimalPart = Math.abs(this.initialMoney.amount % (Math.pow(10, Precision)));
    }
  }

  amountWholePartChanged(value: number): void {
    this.amountWholePart = value;
    this.processInputChange();
  }

  amountDecimalPartChanged(value: number): void {
    this.amountDecimalPart = value;
    this.processInputChange();
  }

  processInputChange() {
    const amountWholePart = this.amountWholePart;
    const sum = (amountWholePart * Math.pow(10, Precision)) + this.amountDecimalPart;

    if (this.isValid()) {
      this.moneyChanged.emit({
        amount: sum,
        currency: 'BGN',
        precision: Precision
      })
    } else {
      this.moneyChanged.emit(null)
    }
  }

  isValid() {
    return this.amountDecimalPart < 100
      && this.amountDecimalPart >= 0;
  }

  onFocus($event: FocusEvent) {
    ($event.target as HTMLInputElement).select();
  }

}
