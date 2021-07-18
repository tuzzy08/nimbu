import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Dispatch, DispatchSchema } from './dispatch/schema/dispatch.schema';
import { DispatchSeeder } from './dispatch/seeder/dispatch.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nimbu'),
    MongooseModule.forFeature([
      { name: Dispatch.name, schema: DispatchSchema },
    ]),
  ],
}).run([DispatchSeeder]);
