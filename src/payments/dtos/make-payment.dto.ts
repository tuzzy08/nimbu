import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

interface Customer {
  email?: string;
  phoneNumber: string;
  fullName: string;
}

export class MakePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  tx_ref;

  @IsNotEmpty()
  @IsString()
  payment_options: string;

  @IsNotEmpty()
  customer: Customer;
}
