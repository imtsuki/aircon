import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from 'src/schemas/log.schema';
import { EventType, WindMode, WindSpeed } from 'src/types';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private LogModel: Model<Log>) {}

  async create(
    roomId: number,
    eventType: EventType,
    windMode: WindMode,
    windSpeed: WindSpeed,
    targetTemp: number,
    time: number,
  ) {
    const createdLog = new this.LogModel({
      roomId: roomId,
      eventType: EventType,
      windMode: WindMode,
      windSpeed: WindSpeed,
      targetTemp: targetTemp,
      time: time,
    });
    return createdLog.save();
  }
}
