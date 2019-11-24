import { Injectable } from '@angular/core';

import * as lowdb from 'lowdb';
import * as FileAsync from "lowdb/adapters/FileAsync"
import { MoneyMovement } from '../models/MoneyMovement';
import { mockData } from './mock';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  db: MoneyMovement[];

  constructor() {
    this.init();
  }

  async init() {
    this.db = mockData;
  }

  getAllMovements() {
    return this.db;
  }

  getMovement(id: string) {
    return this.db.find(movement => movement.id === id);
  }

  addMovement(movement: MoneyMovement) {
    this.db.push({ ...movement, id: getGuid()})
  }

  updateMovement(id: string) {

  }
}

const getGuid = (): string => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  const guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  return guid;
}
