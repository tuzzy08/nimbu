import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';
import { Dispatch, DispatchDocument } from './schema/dispatch.schema';
import { PaymentsService } from 'src/payments/payments.service';
import { DispatchCreatedEvent } from './events/dispatch-created.event';

@Injectable()
export class DispatchService {
  constructor(
    @InjectModel(Dispatch.name)
    private readonly dispatchModel: Model<DispatchDocument>,
    private readonly paymentsService: PaymentsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateDispatchDto): Promise<any> {
    const newDispatch = new this.dispatchModel(data);
    const result = await newDispatch.save();
    const payStackData = {
      paymentOption: result.paymentOption,
      email: result.email,
      amount: result.deliveryCharge,
    };
    // this.eventEmitter.emit('dispatch.created', eventData);
    if (result.paymentOption === 'payOnDelivery') {
      return;
    }
    try {
      return this.paymentsService.payWithPaystack(payStackData);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.dispatchModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatch`;
  }

  update(id: number, updateDispatchDto: UpdateDispatchDto) {
    return `This action updates a #${id} dispatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatch`;
  }
}
