import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ServingQueueService } from './serving-queue.service';
import { WaitQueueService } from './wait-queue.service';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  imports: [StatisticsModule],
  providers: [SchedulerService, ServingQueueService, WaitQueueService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
