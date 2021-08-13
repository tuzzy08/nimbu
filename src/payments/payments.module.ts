import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment, PaymentSchema } from './schemas/payment-schema';
import { PaymentMadeEventListener } from './listeners/payment-made.listener';
import { Dispatch, DispatchSchema } from 'src/dispatch/schema/dispatch.schema';

@Module({
  imports: [
    HttpModule,
    // Added caching support
    CacheModule.register({
      ttl: 10, // seconds
      max: 20, // maximum number of items in cache
    }),
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      { name: Dispatch.name, schema: DispatchSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentMadeEventListener],
  exports: [PaymentsService],
})
export class PaymentsModule {}
