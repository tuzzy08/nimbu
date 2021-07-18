import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';
import { Dispatch, DispatchDocument } from './schema/dispatch.schema';

@Injectable()
export class DispatchService {
  constructor(
    @InjectModel(Dispatch.name)
    private readonly dispatchModel: Model<DispatchDocument>,
  ) {}

  async create(data: CreateDispatchDto) {
    const newDispatch = new this.dispatchModel(data);
    return await newDispatch.save();
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
