import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 10, // seconds
      max: 20, // maximum number of items in cache
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
