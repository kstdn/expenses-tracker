import { MoneyMovementType } from 'src/app/models/MoneyMovementType';

export class CreateMoneyMovementDto {
  accountId: string;
  amount: number;
  timestamp: Date;
  type?: MoneyMovementType;
  description?: string;
}
