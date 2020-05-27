import { Injectable } from '@nestjs/common';
import { WaitQueueService } from './wait-queue.service';
import { WindSpeed } from 'src/types';
import * as R from 'ramda';

@Injectable()
export class ServingQueueService {
  constructor(private waitQueueService: WaitQueueService) {}

  MAX_CAPACITY = 10;

  queue: Array<ServingRoom> = [];

  isFull(): boolean {
    return this.queue.length >= this.MAX_CAPACITY;
  }

  has(roomId: number): boolean {
    if (R.find(R.propEq('roomId', roomId), this.queue)) {
      return true;
    } else {
      return false;
    }
  }

  pushRoom(room: ServingRoom) {
    this.removeIfExists(room.roomId);
    if (this.isFull()) {
      throw new Error('serving queue is full');
    }
    this.queue.push(room);
  }

  removeIfExists(roomId: number) {
    this.queue = R.reject(R.propEq('roomId', roomId), this.queue);
  }

  popLowestPriorityRoomWithWindSpeedBelow(windSpeed: WindSpeed) {
    const byWindSpeed = R.ascend(R.prop('windSpeed'));
    const byServedTime = R.descend(R.prop('servedTime'));
    this.queue = R.sortWith([byWindSpeed, byServedTime], this.queue);
    if (this.queue[0].windSpeed < windSpeed) {
      const roomToWait = this.queue.shift();
      return roomToWait;
    }
  }

  increaseServedTimeBy(time: number) {
    this.queue = R.map(
      room => ({ ...room, servedTime: room.servedTime + time }),
      this.queue,
    );
  }
}

export class ServingRoom {
  roomId: number;
  windSpeed: WindSpeed;
  servedTime: number;
}
