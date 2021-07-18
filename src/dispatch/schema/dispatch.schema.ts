import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { randomInt } from 'crypto';
// import faker from 'faker';

export type DispatchDocument = Dispatch & Document;

@Schema()
export class Dispatch {
  @Factory((faker) => faker.name.findName())
  @Prop({ required: true })
  senderFullName: string;

  @Factory((faker) => faker.phone.phoneNumber())
  @Prop({ required: true })
  senderMobile: string;

  @Factory((faker) => faker.address.streetAddress())
  @Prop({ required: true })
  pickUpAddress: string;

  @Factory((faker) => faker.lorem.words(5))
  @Prop({ required: true })
  itemDescription: string;

  @Factory((faker) => faker.name.findName())
  @Prop()
  receiverFullName: string;

  @Factory((faker) => faker.phone.phoneNumber())
  @Prop({ required: true })
  receiverMobile: string;

  @Factory((faker) => faker.address.streetAddress())
  @Prop()
  dropoffLocation: string;

  @Factory((faker) => randomInt(500, 2000))
  @Prop({ required: true })
  deliveryCharge: number;

  @Prop({ required: true, default: 'Card' })
  paymentType: string;

  @Factory((faker) => faker.name.findName())
  @Prop({ required: true, default: 'Unassigned' })
  dispatchRider: string;

  @Factory('Processing')
  @Prop({ required: true, default: 'Processing' })
  deliveryStatus: string;

  @Factory((faker) => faker.date.past())
  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Factory(true)
  @Prop({ required: true, default: 'PAID' })
  paymentStatus: string;
}

export const DispatchSchema = SchemaFactory.createForClass(Dispatch);
