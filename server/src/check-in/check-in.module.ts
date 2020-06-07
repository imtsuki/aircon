import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckIn, CheckInSchema } from 'src/schemas/check-in.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }]),
    UsersModule,
  ],
  providers: [CheckInService],
  exports: [CheckInService],
})
export class CheckInModule {}
