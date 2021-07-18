import { IsNotEmpty, IsString } from 'class-validator';

interface Customer {
  email: string;
  phonenumber: string;
  name: string;
}

export class MakePaymentDto {
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  payment_options: string;

  @IsNotEmpty()
  customer: Customer;
}
