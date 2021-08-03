import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentMadeEvent } from '../events/payment-made.event';

@Injectable()
export class PaymentMadeEventListener {
  @OnEvent('payment.made')
  handlePaymentMadeEvent(event: PaymentMadeEvent) {
    console.log('Event Handler fired');
    console.log(event);
    // TODO: Handle event
  }
}
