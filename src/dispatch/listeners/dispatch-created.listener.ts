import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentsService } from 'src/payments/payments.service';
import { DispatchService } from '../dispatch.service';
import { DispatchCreatedEvent } from '../events/dispatch-created.event';

@Injectable()
export class DispatchCreatedEventListener {
  constructor(
    private readonly dispatchService: DispatchService,
    private readonly paymentsService: PaymentsService,
  ) {}
  @OnEvent('dispatch.created')
  async handleDispatchCreatedEvent(data: DispatchCreatedEvent) {
    // TODO: Handle event
    console.log(data);
  }
}
