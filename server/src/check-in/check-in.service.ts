import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckInService {
  checkIn(username: string, roomId: number) {
    return;
  }

  checkOut(username: string) {
    return;
  }

  getRoomIdByUsername(username: string) {
    return 0;
  }

  getUsernameByRoomId(roomId: number) {
    return 'alice';
  }
}
