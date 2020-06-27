import { Injectable } from '@nestjs/common';
import { ReportDto } from 'src/dto/report.dto';
import { DetailDto } from 'src/dto/detail.dto';//���������굥
import { WaitQueueService } from 'src/scheduler/wait-queue.service';
import { ServingQueueService } from 'src/scheduler/serving-queue.service';
import { RoomStatus } from 'src/schemas/room-status.schema';
import * as R from 'ramda';

@Injectable()



export class StatisticsService 
{
  constructor(
    @InjectModel(RoomStatus.name) private RoomStatusModel: Model<RoomStatus>,
    private configService: ConfigService,
    private servingQueueService: ServingQueueService,
    private waitQueueService: WaitQueueService,
  ) { }
	 queue: Array<Room> = [];//�ѷ�����У��ȴ����к͹ػ������еķ���ź��굥�������������
    

  statisticsRepository: any;





  logRoomOperation(roomId: number, operation: string) {//
    return;
  }

  getStatisticsByRange(period: 'day' | 'week' | 'month', startTime: Date, endTime: Date): ReportDto {//���ɱ���

  rep = new ReportDto;
  for(log)
	{
	if(log.Date>=startTime && log.Date<=endTime && log.EventType=='dispatch')
	{
		now_room=log.roomId
		in_time = log.Date;//�������ʱ��

		rep.usedMostTemp.unshift(log.targetTemp);
		rep.usedMostWind.unshift(log.windspeed)
		rep.timeOfDispatch.unshift(in_time)
		fee_rate=log.feeRate
		rate = 0;

		if(wind_speed=HIGH)
				rate=1;
			else if(wind_speed=MEDIUM)
				rate=0.5;
			else if(wind_speed=LOW)
				rate=0.3;

		for(log)
		{
			if(log.Date>=in_time && log.Date<=endTime && log.roomId==now_room &&
			log.EventType=='achieveTarget'&&log.eventtype=='close'&&log.eventtype=='wait')
			{
				endtime=log.Date;
				fee.unshift((endtime-in_time)*fee_rate*rate);//
				rep.totalFee.unshift((endtime-in_time)*fee_rate*rate);
				break;
			}
		}
	}

	if(log.EventType=='achieveTarget')//�ﵽĿ���¶�
		rep.timeOfAchieveTarget.unshift(log.Date)

	}
	
	}
	rep.type=period;
    return rep;
  }



  getDetail(roomId: number) {//�굥
	rate = 0;
	detail=new DetailDto;
	wind_speed = HIGH;
	for(log)
	{

		if(log.roomId==roomId  && log.EventType=='dispatch')//�������
		{
			if(wind_speed=HIGH)
				rate=1;
			else if(wind_speed=MEDIUM)
				rate=0.5;
			else if(wind_speed=LOW)
				rate=0.3;
			fee_rate=log.feeRate
			detail.windSpeed.unshift(wind_speed)//

			starttime=log.Date;

			for(log)
			{
				if��log.date>starttime&&log.roomId==roomId&&log.EventType=='achieveTarget'&&log.eventtype=='close'&&log.eventtype=='wait'��
				{
				endtime=log.Date;
				fee.unshift((endtime-starttime)*fee_rate*rate);//
				requestDuration.unshift(endtime-starttime);//
				detail.totalFee+=(endtime-starttime)*fee_rate*rate;
				break;
				}
			}
		}

	}

	return detail;

  }



  getInvoice(roomId: number) {//������һ�������굥���㷨�����еõ����ļ۸�

	detail=getDetail(roomId);
    return detail.totalFee; 
  }


}

  export class Room {
  roomId: number;
  detail_dto:DetailDto;
}