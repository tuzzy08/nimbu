import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;
@Schema()
export class Payment {}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
