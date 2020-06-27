import { Module, forwardRef } from '@nestjs/common';
import { RoomStatusService } from './room-status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomStatus, RoomStatusSchema } from 'src/schemas/room-status.schema';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomStatus.name, schema: RoomStatusSchema },
    ]),
    forwardRef(() => StatisticsModule),
  ],
  providers: [RoomStatusService],
  exports: [RoomStatusService],
})
export class RoomStatusModule {}
