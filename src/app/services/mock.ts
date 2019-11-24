import { MoneyMovement } from '../models/MoneyMovement';
import { MoneyMovementType } from '../models/MoneyMovementType';
import Dinero from 'dinero.js'

const today = new Date();
const yesterday = new Date();
yesterday.setHours(0, 0, 0, 0);
const anotherDay = new Date();
anotherDay.setDate(4);

export const mockData: MoneyMovement[] = [
    {
        amount: Dinero({amount: 50000, currency: 'BGN', precision: 4}),
        sign: 1,
        date: yesterday,
        type: MoneyMovementType.Immediate,
        description: 'Psonia'
    }, {
        amount: Dinero({amount: 50050, currency: 'BGN'}),
        sign: -1,
        date: today,
        type: MoneyMovementType.Immediate,
        description: 'Christmas presents'
    }, {
        amount: Dinero({amount: 10099, currency: 'BGN'}),
        sign: 1,
        date: today,
        type: MoneyMovementType.Immediate,
        description: 'Salary'
    }, {
        amount: Dinero({amount: 10099, currency: 'BGN'}),
        sign: 1,
        date: anotherDay,
        type: MoneyMovementType.Immediate,
        description: 'Another expense'
    }
];