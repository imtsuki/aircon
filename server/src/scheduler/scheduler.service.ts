import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { WaitQueueService } from './wait-queue.service';
import { ServingQueueService } from './serving-queue.service';
import { WindSpeed, Status, WindMode, EventType } from 'src/types';
import { ConfigService } from '@nestjs/config';
import { StatisticsService } from 'src/statistics/statistics.service';
import { RoomStatusService } from 'src/room-status/room-status.service';
import * as R from 'ramda';
import { InjectModel } from '@nestjs/mongoose';
import { RoomStatus } from 'src/schemas/room-status.schema';
import { Model } from 'mongoose';
import config from '../config.json';

@Injectable()
export class SchedulerService {
  constructor(
    private configService: ConfigService,
    private servingQueueService: ServingQueueService,
    private waitQueueService: WaitQueueService,
    private roomStatusService: RoomStatusService,
    @InjectModel(RoomStatus.name) private roomStatusModel: Model<RoomStatus>,
    private statisticsService: StatisticsService,
  ) {}

  /**
   * 基于时间片的调度
   */
  @Interval('schedule', 500)
  async schedule() {
    this.servingQueueService.increaseServedTimeBy(1);
    this.waitQueueService.decreaseWaitTimeBy(1);
    await this.roomStatusService.tick(1);
    const allRooms = (await this.roomStatusService.getAllRoomStatus()).map(
      room => ({
        roomId: room.roomId,
        status: room.status,
        windSpeed: room.windSpeed,
        waitTime: room.waitTime,
        servedTime: room.servedTime,
      }),
    );

    let waiting = allRooms.filter(room => room.status == Status.WAITING);
    let serving = allRooms.filter(room => room.status == Status.SERVING);

    for (const room of waiting) {
      room.waitTime -= 1;
    }

    for (const room of serving) {
      room.servedTime += 1;
      this.statisticsService.logFee(room.roomId, room.windSpeed, 1);
    }

    {
      const byWindSpeed = R.descend(R.prop('windSpeed'));
      const byWaitTime = R.ascend(R.prop('waitTime'));
      waiting = R.sortWith([byWindSpeed, byWaitTime], waiting);
    }

    {
      const byWindSpeed = R.ascend(R.prop('windSpeed'));
      const byServedTime = R.descend(R.prop('servedTime'));
      serving = R.sortWith([byWindSpeed, byServedTime], serving);
    }

    while (waiting.length > 0) {
      if (serving.length < config.servingCapacity) {
        const room = waiting.shift();
        if (room) {
          room.waitTime = 0;
          room.servedTime = 0;
          room.status = Status.SERVING;
          serving.push(room);
          this.statisticsService.log(room.roomId, EventType.SCHEDULED);
        }
      } else if (
        waiting[0].waitTime <= 0 &&
        waiting[0].windSpeed >= serving[0].windSpeed
      ) {
        const roomToWait = serving.shift();
        const roomToServe = waiting.shift();
        if (roomToWait && roomToServe) {
          roomToWait.servedTime = 0;
          roomToWait.waitTime = 120;
          roomToWait.status = Status.WAITING;
          roomToServe.servedTime = 0;
          roomToServe.waitTime = 0;
          roomToServe.status = Status.SERVING;
          serving.push(roomToServe);
          this.statisticsService.log(roomToServe.roomId, EventType.SCHEDULED);
          waiting.push(roomToWait);
          this.statisticsService.log(roomToWait.roomId, EventType.WAIT);
        }
      } else {
        break;
      }
    }

    // 更新
    serving.map(room => {
      console.log(room);
      this.roomStatusModel
        .updateOne({ roomId: room.roomId }, { $set: room })
        .exec();
    });

    waiting.map(room => {
      this.roomStatusModel
        .updateOne({ roomId: room.roomId }, { $set: room })
        .exec();
    });
  }

  /**
   * 用户开机
   * @param roomId
   */
  async turnOn(roomId: number) {
    const room = await this.roomStatusService.getRoomStatus(roomId);
    if (room) {
      if (room.status == Status.OFF) {
        this.statisticsService.log(roomId, EventType.TURN_ON);
        // 重新开机，恢复默认设置
        await Promise.all([
          this.roomStatusService.setTargetTemp(roomId, 25),
          this.roomStatusService.setWindMode(roomId, WindMode.COOLING),
          this.roomStatusService.setWindSpeed(roomId, WindSpeed.MEDIUM),
        ]);
        await this.handleIncomingRequest(roomId, WindSpeed.MEDIUM);
      } else {
        throw new BadRequestException(`room ${roomId} is already turned on`);
      }
    } else {
      throw new BadRequestException(`No such room with roomId ${roomId}`);
    }
    return;
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
  async handleIncomingRequest(roomId: number, windSpeed: WindSpeed) {
    // 删除服务队列中原对象
    const allRooms = (await this.roomStatusService.getAllRoomStatus())
      .map(room => ({
        roomId: room.roomId,
        status: room.status,
        windSpeed: room.windSpeed,
        waitTime: room.waitTime,
        servedTime: room.servedTime,
      }))
      .filter(room => room.roomId != roomId);

    let waiting = allRooms.filter(room => room.status == Status.WAITING);
    let serving = allRooms.filter(room => room.status == Status.SERVING);

    // 选择等待队列中一个对象到服务队列
    {
      const byWindSpeed = R.descend(R.prop('windSpeed'));
      const byWaitTime = R.ascend(R.prop('waitTime'));
      waiting = R.sortWith([byWindSpeed, byWaitTime], waiting);
    }

    while (
      serving.length < /* TODO */ config.servingCapacity &&
      waiting.length > 0
    ) {
      const toServe = waiting.shift();
      if (toServe) {
        toServe.status = Status.SERVING;
        toServe.waitTime = 0;
        toServe.servedTime = 0;
        serving.push(toServe);
        this.statisticsService.log(toServe.roomId, EventType.SCHEDULED);
      }
    }

    // 处理新请求
    {
      const byWindSpeed = R.ascend(R.prop('windSpeed'));
      const byServedTime = R.descend(R.prop('servedTime'));
      serving = R.sortWith([byWindSpeed, byServedTime], serving);
    }

    if (serving.length < config.servingCapacity) {
      serving.push({
        roomId: roomId,
        status: Status.SERVING,
        windSpeed: windSpeed,
        waitTime: 0,
        servedTime: 0,
      });
      this.statisticsService.log(roomId, EventType.SCHEDULED);
    } else if (serving[0].windSpeed < windSpeed) {
      const roomToWait = serving.shift();
      if (roomToWait) {
        roomToWait.servedTime = 0;
        roomToWait.waitTime = 120;
        waiting.push(roomToWait);
        this.statisticsService.log(roomToWait.roomId, EventType.WAIT);
        serving.push({
          roomId: roomId,
          status: Status.SERVING,
          windSpeed: windSpeed,
          waitTime: 0,
          servedTime: 0,
        });
        this.statisticsService.log(roomId, EventType.SCHEDULED);
      }
    } else {
      waiting.push({
        roomId: roomId,
        status: Status.WAITING,
        windSpeed: windSpeed,
        waitTime: 120,
        servedTime: 0,
      });
      this.statisticsService.log(roomId, EventType.WAIT);
    }

    // 更新
    serving.map(room => {
      console.log(room);
      this.roomStatusModel
        .updateOne({ roomId: room.roomId }, { $set: room })
        .exec();
    });

    waiting.map(room => {
      this.roomStatusModel
        .updateOne({ roomId: room.roomId }, { $set: room })
        .exec();
    });
  }

  async changeWind(roomId: number, windSpeed: WindSpeed) {
    await this.handleIncomingRequest(roomId, windSpeed);
  }

  /**
   * 主动关机
   * @param roomId
   */
  async turnOff(roomId: number) {
    this.statisticsService.log(roomId, EventType.TURN_OFF);
    await this.roomStatusService.turnOff(roomId);
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
