import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Precision } from "src/app/helpers/Constants";

@Component({
  selector: "amount-input",
  templateUrl: "./amount-input.component.html",
  styleUrls: ["./amount-input.component.scss"],
})
export class AmountInputComponent {
  @Input() initialAmount: number;
  @Input() negateAmount: boolean;
  @Output() moneyChanged = new EventEmitter<number>();

  form: FormGroup;

  amountWholePart: number = 0;
  amountDecimalPart: number = 0;

  ngOnInit() {
    this.form = new FormGroup({
      amountWholePart: new FormControl(this.amountWholePart),
      amountDecimalPart: new FormControl(this.amountDecimalPart),
    });

    this.form.controls.amountWholePart.valueChanges.subscribe((value) => {
      this.amountWholePartChanged(value);
    });

    this.form.controls.amountDecimalPart.valueChanges.subscribe((value) => {
      this.amountDecimalPartChanged(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialAmount && changes.initialAmount.isFirstChange) {
      this.initialAmount = this.initialAmount || 0;
      if (this.negateAmount) this.initialAmount = this.initialAmount * -1;
      const amountWholePart = this.initialAmount / Math.pow(10, Precision);
      this.amountWholePart = Math.floor(amountWholePart);
      this.amountDecimalPart = Math.abs(
        this.initialAmount % Math.pow(10, Precision)
      );
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
    const sum =
      amountWholePart * Math.pow(10, Precision) + this.amountDecimalPart;

    if (this.isValid()) {
      this.moneyChanged.emit(sum);
    } else {
      this.moneyChanged.emit(null);
    }
  }

  isValid() {
    return this.amountDecimalPart < 100 && this.amountDecimalPart >= 0;
  }

  onFocus($event: FocusEvent) {
    ($event.target as HTMLInputElement).select();
  }
}
