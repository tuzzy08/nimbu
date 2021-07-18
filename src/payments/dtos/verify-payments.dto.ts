import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @IsNotEmpty()
  @IsString()
  tx_ref: string;

  @IsNotEmpty()
  @IsString()
  transaction_id: string;
}
