import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DispatchModule } from './dispatch/dispatch.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.DEV_DB_URL}`),
    DispatchModule,
    UsersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
