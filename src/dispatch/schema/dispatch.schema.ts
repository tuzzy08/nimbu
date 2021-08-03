import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { randomInt } from 'crypto';
// import faker from 'faker';

export type DispatchDocument = Dispatch & Document;

enum PaymentStatus {
  paid = 'PAID',
  pending = 'PENDING',
  cancelled = 'CANCELLED',
}

enum deliveryStatus {
  delivered = 'DELIVERED',
  pending = 'PENDING',
  processing = 'PROCESSING',
  cancelled = 'CANCELLED',
}

@Schema()
export class Dispatch {
  @Factory((faker) => faker.name.findName())
  @Prop()
  tx_ref: string;

  @Factory((faker) => faker.name.findName())
  @Prop({ required: true })
  senderFullName: string;

  @Factory((faker) => faker.internet.email())
  @Prop({ required: true })
  email: string;

  @Factory((faker) => faker.phone.phoneNumber())
  @Prop({ required: true })
  senderPhone: string;

  @Factory((faker) => faker.address.streetAddress())
  @Prop({ required: true })
  pickupAddress: string;

  @Factory((faker) => faker.lorem.words(5))
  @Prop({ required: true })
  item: string;

  @Factory((faker) => faker.lorem.words(5))
  @Prop({ required: true })
  itemDescription: string;

  @Factory((faker) => faker.name.findName())
  @Prop()
  receiverFullName: string;

  @Factory((faker) => faker.phone.phoneNumber())
  @Prop({ required: true })
  receiverPhone: string;

  @Factory((faker) => faker.address.streetAddress())
  @Prop({ required: true, default: '' })
  dropoffLocation: string;

  @Factory(() => randomInt(500, 2000))
  @Prop({ required: true })
  deliveryCharge: number;

  @Prop({ required: true, default: 'Card' })
  paymentOption: string;

  @Factory((faker) => faker.name.findName())
  @Prop({ required: true, default: 'Unassigned' })
  dispatchRider: string;

  @Factory('Processing')
  @Prop({ required: true, default: deliveryStatus.processing })
  deliveryStatus: string;

  @Factory((faker) => faker.date.past())
  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Factory(true)
  @Prop({ required: true, default: PaymentStatus.pending })
  paymentStatus: string;
}

export const DispatchSchema = SchemaFactory.createForClass(Dispatch);
