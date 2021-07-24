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
  @IsString()
  payment_options: string;

  @IsNotEmpty()
  customer: Customer;
}
