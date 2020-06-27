import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ServingQueueService } from './serving-queue.service';
import { WaitQueueService } from './wait-queue.service';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { RoomStatusModule } from 'src/room-status/room-status.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomStatus, RoomStatusSchema } from 'src/schemas/room-status.schema';

@Module({
  imports: [
    StatisticsModule,
    RoomStatusModule,
    MongooseModule.forFeature([
      { name: RoomStatus.name, schema: RoomStatusSchema },
    ]),
  ],
  providers: [SchedulerService, ServingQueueService, WaitQueueService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
