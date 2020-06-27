import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(createUserDto.username);

    if (user) {
      throw new BadRequestException(`user ${user.username} already exists`);
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
