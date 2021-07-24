import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDispatchDto {
  @IsNotEmpty()
  @IsString()
  senderFullName: string;

  @IsNotEmpty()
  senderMobile: string;

  @IsNotEmpty()
  pickUpAddress: string;

  @IsNotEmpty()
  itemDescription: string;

  @IsNotEmpty()
  receiverFullName: string;

  @IsNotEmpty()
  receiverMobile: string;

  @IsNotEmpty()
  dropoffLocation?: string;

  @IsNotEmpty()
  receiverAddress: string;

  @IsNotEmpty()
  deliveryCharge?: number;

  @IsNotEmpty()
  paymentType?: string;

  @IsNotEmpty()
  deliveryStatus?: string;
}
