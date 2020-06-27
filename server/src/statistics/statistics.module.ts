import { Module, forwardRef } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/schemas/log.schema';
import { CheckInModule } from 'src/check-in/check-in.module';
import { CheckIn, CheckInSchema } from 'src/schemas/check-in.schema';
import { RoomStatusModule } from 'src/room-status/room-status.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }]),
    CheckInModule,
    forwardRef(() => RoomStatusModule),
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
