import { Currency } from 'dinero.js';

export interface SimpleMoney {
    amount: number;
    currency: Currency;
    precision: number;
}