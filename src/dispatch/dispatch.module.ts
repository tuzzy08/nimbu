import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dispatch, DispatchSchema } from './schema/dispatch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dispatch.name, schema: DispatchSchema },
    ]),
  ],
  controllers: [DispatchController],
  providers: [DispatchService],
})
export class DispatchModule {}
