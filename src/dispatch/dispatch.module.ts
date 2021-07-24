import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dispatch, DispatchSchema } from './schema/dispatch.schema';
import { PaymentsModule } from 'src/payments/payments.module';
import { DispatchCreatedEventListener } from './listeners/dispatch-created.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dispatch.name, schema: DispatchSchema },
    ]),
    PaymentsModule,
  ],
  controllers: [DispatchController],
  providers: [DispatchService, DispatchCreatedEventListener],
})
export class DispatchModule {}
