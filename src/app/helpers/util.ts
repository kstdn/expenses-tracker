import { Amount } from "../models/Amount";

export const getAmount: ((amount: number) => Amount) = (amount: number) => {
    const beforeDecimalPoint: number = Math.floor(Math.abs(amount));
    return {
        sign: Math.sign(amount),
        beforeDecimalPoint,
        afterDecimalPoint: (Math.abs(amount) - beforeDecimalPoint)
    }
};