import { IsNotEmpty, IsString } from 'class-validator';

class Customer {
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
  dropoffLocation?: string;

  @IsNotEmpty()
  receiverAddress: string;
}

export class CreateDispatchDto {
  @IsNotEmpty()
  deliveryCharge: number;

  @IsNotEmpty()
  paymentOption: string;

  @IsNotEmpty()
  customer: Customer;
}
