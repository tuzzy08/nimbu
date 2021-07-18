import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dispatch } from '../schema/dispatch.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class DispatchSeeder implements Seeder {
  constructor(
    @InjectModel(Dispatch.name) private readonly dispatch: Model<Dispatch>,
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const dispatches = DataFactory.createForClass(Dispatch).generate(10);

    // Insert into the database.
    return this.dispatch.insertMany(dispatches);
  }

  async drop(): Promise<any> {
    return this.dispatch.deleteMany({});
  }
}
