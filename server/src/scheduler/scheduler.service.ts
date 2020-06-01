import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { WaitQueueService } from './wait-queue.service';
import { ServingQueueService } from './serving-queue.service';
import { WindSpeed } from 'src/types';
import { ConfigService } from '@nestjs/config';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class SchedulerService {
  constructor(
    private configService: ConfigService,
    private servingQueueService: ServingQueueService,
    private waitQueueService: WaitQueueService,
    private statisticsService: StatisticsService,
  ) {
    this.initialWaitTime =
      this.configService.get<number>('initialWaitTime') ?? 30;
  }

  private readonly logger = new Logger(SchedulerService.name);

  private initialWaitTime: number;

  /**
   * 基于时间片的调度
   */
  @Interval('schedule', 1000)
  schedule() {
    this.logger.debug('Scheduling');
    this.servingQueueService.increaseServedTimeBy(1);
    this.waitQueueService.decreaseWaitTimeBy(1);
  }

  /**
   * 基于优先级的调度
   *
   * ## 请求过程
   *
   * 变风速请求 -> 删除服务队列中原对象 -> 选择等待队列中一个对象到服务队列 -> 处理新请求
   *
   * @param roomId
   * @param windSpeed
   */
  changeWind(roomId: number, windSpeed: WindSpeed) {
    // 删除服务队列中原对象
    this.removeIfExists(roomId);

    // 选择等待队列中一个对象到服务队列
    while (
      !this.servingQueueService.isFull() &&
      !this.waitQueueService.isEmpty()
    ) {
      const room = this.waitQueueService.popHighestPriorityRoom();
      if (room) {
        this.servingQueueService.pushRoom({
          roomId: room.roomId,
          windSpeed: room.windSpeed,
          servedTime: 0,
        });
      }
    }

    // 处理新请求
    if (!this.servingQueueService.isFull()) {
      this.servingQueueService.pushRoom({
        roomId,
        windSpeed,
        servedTime: 0,
      });
      return;
    }

    const roomToWait = this.servingQueueService.popLowestPriorityRoomWithWindSpeedBelow(
      windSpeed,
    );

    if (roomToWait) {
      this.waitQueueService.pushRoom({
        roomId: roomToWait.roomId,
        windSpeed: roomToWait.windSpeed,
        waitTime: this.initialWaitTime,
      });
      this.servingQueueService.pushRoom({
        roomId,
        windSpeed,
        servedTime: 0,
      });
    } else {
      this.waitQueueService.pushRoom({
        roomId,
        windSpeed,
        waitTime: this.initialWaitTime,
      });
    }
  }

  /**
   * 主动关机
   * @param roomId
   */
  turnOff(roomId: number) {
    this.removeIfExists(roomId);
    while (
      !this.servingQueueService.isFull() &&
      !this.waitQueueService.isEmpty()
    ) {
      const room = this.waitQueueService.popHighestPriorityRoom();
      if (room) {
        this.servingQueueService.pushRoom({
          roomId: room.roomId,
          windSpeed: room.windSpeed,
          servedTime: 0,
        });
      }
    }
  }

  getStatus(roomId: number) {
    if (this.servingQueueService.has(roomId)) {
      return 'serving';
    } else if (this.waitQueueService.has(roomId)) {
      return 'waiting';
    } else {
      return 'off';
    }
  }

  removeIfExists(roomId: number) {
    this.servingQueueService.removeIfExists(roomId);
    this.waitQueueService.removeIfExists(roomId);
  }
}
