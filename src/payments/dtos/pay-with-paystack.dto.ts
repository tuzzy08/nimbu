import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PayWithPaystackDto {
  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  paymentOption: string;
}
