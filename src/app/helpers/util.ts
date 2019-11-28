import Dinero from 'dinero.js'
import { SimpleMoney } from '../models/SimpleMoney';

export const Money = (simpleDinero: SimpleMoney) => {
    return Dinero(simpleDinero);
};