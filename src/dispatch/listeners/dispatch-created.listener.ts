import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DispatchCreatedEvent } from '../events/dispatch-created.event';

@Injectable()
export class DispatchCreatedEventListener {
  @OnEvent('dispatch.created')
  handleDispatchCreatedEvent(event: DispatchCreatedEvent) {
    console.log('Event Handler fired');
    console.log(event);
    // TODO: Handle event
  }
}
