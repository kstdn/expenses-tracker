import { Injectable } from '@angular/core';
import Dinero from 'dinero.js'

import { MoneyMovement } from '../models/MoneyMovement';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  movements: MoneyMovement[] = [];

  constructor(
    private backendService: BackendService
  ) { }

  getCurrentBalance(movements: MoneyMovement[]): Dinero {
    return movements.reduce((acc: Dinero, curr: MoneyMovement) => {
      if(curr.sign > 0) {
        return acc.add(curr.amount)
      } else {
        return acc.subtract(curr.amount)
      }
    }, Dinero({amount: 0, currency: 'BGN', precision: 2}));
  }
}
