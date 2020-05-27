import { Injectable } from '@nestjs/common';
import { WindSpeed } from 'src/types';
import * as R from 'ramda';

@Injectable()
export class WaitQueueService {
  queue: Array<WaitRoom> = [];

  isEmpty(): boolean {
    return this.queue.length == 0;
  }

  has(roomId: number): boolean {
    if (R.find(R.propEq('roomId', roomId), this.queue)) {
      return true;
    } else {
      return false;
    }
  }

  popHighestPriorityRoom() {
    const byWindSpeed = R.descend(R.prop('windSpeed'));
    const byWaitTime = R.ascend(R.prop('waitTime'));
    this.queue = R.sortWith([byWindSpeed, byWaitTime], this.queue);
    const expired = this.queue.shift();
    return expired;
  }

  pushRoom(room: WaitRoom) {
    this.removeIfExists(room.roomId);
    this.queue.push(room);
  }

  removeIfExists(roomId: number) {
    this.queue = R.reject(R.propEq('roomId', roomId), this.queue);
  }

  decreaseWaitTimeBy(time: number) {
    this.queue = R.map(
      room => ({ ...room, waitTime: room.waitTime - time }),
      this.queue,
    );
  }
}

export class WaitRoom {
  roomId: number;
  windSpeed: WindSpeed;
  waitTime: number;
}
