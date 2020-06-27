import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { ReportDto } from 'src/dto';
import { CheckInService } from 'src/check-in/check-in.service';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from 'src/schemas/log.schema';
import { Model } from 'mongoose';
import { CheckIn } from 'src/schemas/check-in.schema';
import { WindSpeed, EventType } from 'src/types';
import { RoomStatusService } from 'src/room-status/room-status.service';

@Injectable()
export class StatisticsService {
  constructor(
    private checkInService: CheckInService,
    @Inject(forwardRef(() => RoomStatusService))
    private roomStatusService: RoomStatusService,
    @InjectModel(Log.name) private logModel: Model<Log>,
    @InjectModel(CheckIn.name) private checkInModel: Model<CheckIn>,
  ) {}

  async logFee(roomId: number, windSpeed: WindSpeed, time: number) {
    const checkIn = await this.checkInService.getCheckInByRoomId(roomId);
    if (checkIn) {
      let delta;
      switch (windSpeed) {
        case WindSpeed.LOW:
          delta = ((1 / 3) * time) / 60;
          break;
        case WindSpeed.MEDIUM:
          delta = ((1 / 2) * time) / 60;

          break;
        case WindSpeed.HIGH:
          delta = (1 * time) / 60;

          break;
      }
      await this.checkInModel.updateOne(
        { _id: checkIn._id },
        { $inc: { fee: delta } },
      );
    }
    return;
  }

  async log(roomId: number, eventType: EventType) {
    const checkIn = await this.checkInService.getCheckInByRoomId(roomId);
    if (checkIn) {
      const roomStatus = await this.roomStatusService.getRoomStatus(roomId);
      if (roomStatus) {
        const craetedLog = new this.logModel({
          roomId: roomId,
          checkInId: checkIn._id,
          timestamp: new Date(),
          eventType: eventType,
          windMode: roomStatus.windMode,
          windSpeed: roomStatus.windSpeed,
          curTemp: roomStatus.curTemp,
          targetTemp: roomStatus.targetTemp,
          fee: checkIn.fee,
        });
        return craetedLog.save();
      }
    }
    return;
  }

  async getDetail(username: string) {
    const checkIn = await this.checkInService.getCheckInByUsername(username);
    if (checkIn) {
      const detail = await this.logModel
        .find({ checkInId: checkIn._id })
        .exec();
      return {
        fee: checkIn.fee,
        logs: detail,
      };
    } else {
      throw new BadRequestException(`user ${username} is not checked in`);
    }
  }

  async getReport() {
    return await this.logModel
      .aggregate([
        {
          $group: {
            _id: {
              roomId: '$roomId',
            },
            turnOnCount: {
              $sum: { $cond: [{ $eq: ['$eventType', 'turnOn'] }, 1, 0] },
            },
            detailCount: { $sum: 1 },
            totalFee: { $max: '$fee' },
            pauseCount: {
              $sum: { $cond: [{ $eq: ['$eventType', 'pause'] }, 1, 0] },
            },
            scheduledCount: {
              $sum: { $cond: [{ $eq: ['$eventType', 'scheduled'] }, 1, 0] },
            },
            favSpeed: {
              $last: '$windSpeed',
            },
            favTargetTemp: {
              $last: '$targetTemp',
            },
          },
        },
        {
          $addFields: {
            roomId: '$_id.roomId',
          },
        },
      ])
      .exec();
  }
}
