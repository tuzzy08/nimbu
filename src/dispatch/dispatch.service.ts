import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';
import { Dispatch, DispatchDocument } from './schema/dispatch.schema';
import { PaymentsService } from 'src/payments/payments.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DispatchService {
  constructor(
    @InjectModel(Dispatch.name)
    private readonly dispatchModel: Model<DispatchDocument>,
    private readonly paymentsService: PaymentsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dispatch: CreateDispatchDto): Promise<any> {
    const newDispatch = new this.dispatchModel(dispatch);
    const id = uuidv4();
    newDispatch.reference = `nimbu-${id}`;
    const result = await newDispatch.save();
    const data = {
      reference: result.reference,
      paymentOption: result.paymentOption,
      email: result.email,
      amount: result.deliveryCharge,
    };
    this.eventEmitter.emit('dispatch.created', data);
    if (result.paymentOption === 'payOnDelivery') {
      return;
    }
    try {
      const response = await this.paymentsService.payWithPaystack(data);
      return response;
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

  async update(id: string, updateDispatchDto: any) {
    return this.dispatchModel.find({ id }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} dispatch`;
  }
}
