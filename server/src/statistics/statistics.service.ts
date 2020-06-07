import { Injectable } from '@nestjs/common';
import { ReportDto } from 'src/dto';

@Injectable()
export class StatisticsService {
  statisticsRepository: any;

  logRoomOperation(roomId: number, operation: string) {
    return;
  }

  getStatisticsByRange(period: 'day' | 'week' | 'month'): ReportDto {
    return new ReportDto();
  }

  getDetail(roomId: number) {
    return;
  }

  getInvoice(roomId: number) {
    return;
  }
}
