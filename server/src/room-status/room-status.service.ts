import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomStatus } from 'src/schemas/room-status.schema';
import { Status, WindSpeed, WindMode, EventType } from 'src/types';
import { StatisticsService } from 'src/statistics/statistics.service';
import config from '../config.json';

@Injectable()
export class RoomStatusService {
  constructor(
    @InjectModel(RoomStatus.name) private roomStatusModel: Model<RoomStatus>,
    @Inject(forwardRef(() => StatisticsService))
    private statisticsService: StatisticsService,
  ) {
    config.initialStatus.map(value => {
      this.roomStatusModel
        .updateOne(
          { roomId: value.roomId },
          {
            $set: {
              roomId: value.roomId,
              status: Status.OFF,
              windMode: WindMode.COOLING,
              windSpeed: WindSpeed.MEDIUM,
              initialTemp: value.initialTemp,
              curTemp: value.initialTemp,
              targetTemp: 25,
              waitTime: 0,
              servedTime: 0,
            },
          },
          { upsert: true },
        )
        .exec();
    });
  }

  async getAllRoomStatus(): Promise<RoomStatus[]> {
    return this.roomStatusModel.find().exec();
  }

  async getRoomStatus(roomId: number): Promise<RoomStatus | null> {
    return this.roomStatusModel.findOne({ roomId: roomId }).exec();
  }

  // time: 向前推进几秒
  async tick(seconds: number) {
    await Promise.all(
      [101, 102, 103, 104, 105].map(async roomId => {
        const room = await this.getRoomStatus(roomId);
        if (room) {
          if (
            room.status === Status.PAUSE &&
            ((room.windMode === WindMode.COOLING &&
              room.curTemp - room.targetTemp >= 1) ||
              (room.windMode === WindMode.HEATING &&
                room.targetTemp - room.curTemp >= 1))
          ) {
            this.roomStatusModel
              .updateOne(
                { roomId: roomId },
                {
                  $set: {
                    status: Status.WAITING,
                    waitTime: 0,
                  },
                },
              )
              .exec();
            this.statisticsService.log(roomId, EventType.WAIT);
          }

          if (room.status === Status.SERVING) {
            let nextTemp = room.curTemp;
            let delta;

            switch (room.windSpeed) {
              case WindSpeed.LOW:
                delta = (0.4 * seconds) / 60;
                break;
              case WindSpeed.MEDIUM:
                delta = (0.5 * seconds) / 60;
                break;
              case WindSpeed.HIGH:
                delta = (0.6 * seconds) / 60;
                break;
            }

            let pause = false;

            switch (room.windMode) {
              case WindMode.COOLING:
                nextTemp -= delta;
                if (nextTemp <= room.targetTemp) {
                  pause = true;
                }

                break;
              case WindMode.HEATING:
                nextTemp += delta;
                if (nextTemp >= room.targetTemp) {
                  pause = true;
                }
                break;
            }

            if (pause) {
              await this.roomStatusModel
                .updateOne(
                  { roomId: roomId },
                  {
                    $set: {
                      curTemp: nextTemp,
                      status: Status.PAUSE,
                      servedTime: 0,
                    },
                  },
                )
                .exec();
              console.log('>');
              this.statisticsService.log(roomId, EventType.PAUSE);
            } else {
              await this.roomStatusModel
                .updateOne(
                  { roomId: roomId },
                  {
                    $set: {
                      curTemp: nextTemp,
                    },
                  },
                )
                .exec();
            }
          } else {
            const delta = (0.5 * seconds) / 60;
            let nextTemp = room.curTemp;
            if (nextTemp <= room.initialTemp) {
              nextTemp += delta;
              if (nextTemp > room.initialTemp) {
                nextTemp = room.initialTemp;
              }
            } else {
              nextTemp -= delta;
              if (nextTemp < room.initialTemp) {
                nextTemp = room.initialTemp;
              }
            }
            await this.roomStatusModel
              .updateOne(
                { roomId: roomId },
                {
                  $set: {
                    curTemp: nextTemp,
                  },
                },
              )
              .exec();
          }
        }
      }),
    );
  }

  async setTargetTemp(roomId: number, targetTemp: number) {
    const room = await this.getRoomStatus(roomId);
    if (room) {
      if (
        room.windMode == WindMode.COOLING &&
        (targetTemp > 25 || targetTemp < 18)
      ) {
        throw new BadRequestException(
          `Cooling mode need target temp from 18 to 25, ${targetTemp} isn't satisfiable`,
        );
      }
      if (
        room.windMode == WindMode.HEATING &&
        (targetTemp < 25 || targetTemp > 30)
      ) {
        throw new BadRequestException(
          `Heating mode need target temp from 25 to 30, ${targetTemp} isn't satisfiable`,
        );
      }

      await this.roomStatusModel
        .updateOne({ roomId: roomId }, { $set: { targetTemp: targetTemp } })
        .exec();
    } else {
      throw new BadRequestException(`No such room with roomId ${roomId}`);
    }
  }

  async setWindMode(roomId: number, windMode: WindMode) {
    const room = await this.getRoomStatus(roomId);
    if (room) {
      if (room.windMode == windMode) {
        return;
      } else {
        await this.roomStatusModel
          .updateOne(
            { roomId: roomId },
            { $set: { windMode: windMode, targetTemp: 25 } },
          )
          .exec();
      }
    } else {
      throw new BadRequestException(`No such room with roomId ${roomId}`);
    }
  }

  async setWindSpeed(roomId: number, windSpeed: WindSpeed) {
    const room = await this.getRoomStatus(roomId);
    if (room) {
      await this.roomStatusModel
        .updateOne({ roomId: roomId }, { $set: { windSpeed: windSpeed } })
        .exec();
    } else {
      throw new BadRequestException(`No such room with roomId ${roomId}`);
    }
  }

  async turnOff(roomId: number) {
    const room = await this.getRoomStatus(roomId);
    if (room) {
      await this.roomStatusModel
        .updateOne(
          { roomId: roomId },
          { $set: { status: Status.OFF, servedTime: 0, waitTime: 0 } },
        )
        .exec();
    } else {
      throw new BadRequestException(`No such room with roomId ${roomId}`);
    }
  }
}
