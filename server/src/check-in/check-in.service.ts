import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckInDto } from 'src/dto';
import { CheckIn } from 'src/schemas/check-in.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckInService {
  constructor(
    @InjectModel(CheckIn.name) private checkInModel: Model<CheckIn>,
    private usersService: UsersService,
  ) {}

  async checkIn(checkInDto: CheckInDto) {
    const user = await this.usersService.findOne(checkInDto.username);
    if (!user) {
      throw new BadRequestException(
        `user ${checkInDto.username} does not exist`,
      );
    }
    if (user.role != 'client') {
      throw new BadRequestException(
        `user ${checkInDto.username}'s role is not 'client'`,
      );
    }

    if (checkInDto.roomId < 101 || checkInDto.roomId > 105) {
      throw new BadRequestException(
        `no such room with roomId ${checkInDto.roomId}`,
      );
    }

    const existingCheckIn = await this.checkInModel.findOne({
      active: true,
      $or: [{ username: checkInDto.username }, { roomId: checkInDto.roomId }],
    });
    if (existingCheckIn) {
      throw new BadRequestException(
        `room ${checkInDto.roomId} or user ${checkInDto.username} is already checked in`,
      );
    }

    const createdCheckIn = new this.checkInModel({
      ...checkInDto,
      active: true,
      fee: 0,
    });
    return createdCheckIn.save();
  }

  async checkOut(username: string) {
    const result = await this.checkInModel
      .findOneAndUpdate(
        { username: username, active: true },
        { $set: { active: false } },
      )
      .exec();

    if (!result) {
      throw new NotFoundException(`user ${username} is not checked in`);
    }
    return result;
  }

  async getRoomIdByUsername(username: string) {
    return (
      await this.checkInModel
        .findOne({ username: username, active: true })
        .exec()
    )?.roomId;
  }

  async getCheckInByUsername(username: string) {
    return this.checkInModel
      .findOne({ username: username, active: true })
      .exec();
  }

  async getCheckInByRoomId(roomId: number) {
    return this.checkInModel.findOne({ roomId: roomId, active: true }).exec();
  }

  async getUsernameByRoomId(roomId: number) {
    return (
      await this.checkInModel.findOne({ roomId: roomId, active: true }).exec()
    )?.username;
  }

  async getAllCheckIns() {
    return await this.checkInModel.find({ active: true }).exec();
  }
}
