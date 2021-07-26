import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDispatchDto {
  @IsNotEmpty()
  @IsString()
  tx_ref;

  @IsNotEmpty()
  @IsString()
  senderFullName: string;

  @IsNotEmpty()
  senderPhone: string;

  @IsNotEmpty()
  pickupAddress: string;

  @IsNotEmpty()
  item: string;

  @IsNotEmpty()
  itemDescription: string;

  @IsNotEmpty()
  receiverFullName: string;

  @IsNotEmpty()
  receiverPhone: string;

  @IsNotEmpty()
  dropoffLocation: string;

  @IsNotEmpty()
  receiverAddress: string;
  @IsNotEmpty()
  deliveryCharge: number;

  @IsNotEmpty()
  paymentOption: string;
}
