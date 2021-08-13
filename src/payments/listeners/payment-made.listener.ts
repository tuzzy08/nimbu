import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DispatchService } from 'src/dispatch/dispatch.service';
import {
  Dispatch,
  DispatchDocument,
} from 'src/dispatch/schema/dispatch.schema';
import { PaymentMadeEvent } from '../events/payment-made.event';

@Injectable()
export class PaymentMadeEventListener {
  constructor(
    @InjectModel(Dispatch.name)
    private readonly dispatchModel: Model<DispatchDocument>,
  ) {}
  @OnEvent('payment.made')
  async handlePaymentMadeEvent(reference: string) {
    const doc = await this.dispatchModel
      .findOne({ reference: reference })
      .exec();
    doc.paymentStatus = 'PAID';
    return await doc.save();
  }
}
