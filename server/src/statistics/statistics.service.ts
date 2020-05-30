import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  statisticsRepository: any;

  logRoomOperation(roomId: number, operation: string) {
    return;
  }

  getStatisticsByRange(period: 'day' | 'week' | 'month') {
    return;
  }

  getDetail(roomId: number) {
    return;
  }

  getInvoice(roomId: number) {
    return;
  }
}
