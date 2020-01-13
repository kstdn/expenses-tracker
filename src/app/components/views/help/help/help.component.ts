import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MovementsService } from 'src/app/services/movements.service';
import { tap } from 'rxjs/operators';

const BtnMessages = {
  CHECK: 'Check balance',
  LOADING: 'Loading...'
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  balanceButtonMessage: string = BtnMessages.CHECK;
  balanceCheckMessage: string = "";

  constructor(
    private movementsService: MovementsService
  ) { }

  ngOnInit() {

  }

  checkBalance() {
    this.balanceButtonMessage = BtnMessages.LOADING;
    forkJoin([
      this.movementsService.getCurrentBalance$(),
      this.movementsService.getAccumulatedCurrentBalance$()
    ])
    .pipe(tap(() => this.balanceButtonMessage = BtnMessages.CHECK))
    .subscribe(([currentBalance, currentAccumulatedBalance]) => {
      if(currentBalance === currentAccumulatedBalance) {
        this.balanceCheckMessage = `Balance is correct!`
      } else {
        this.balanceCheckMessage = `The balance is ${currentBalance}, but the sum of all money movements is ${currentAccumulatedBalance}`
      }
    })
  }

}
