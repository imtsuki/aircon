import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status, WindSpeed, WindMode } from 'src/types';

@Schema()
export class RoomStatus extends Document {
  @Prop({ required: true })
  roomId: number;

  @Prop({ required: true })
  status: Status;

  @Prop({ required: true })
  windMode: WindMode;

  @Prop({ required: true })
  windSpeed: WindSpeed;

  @Prop({ required: true })
  initialTemp: number;

  @Prop({ required: true })
  curTemp: number;

  @Prop({ required: true })
  targetTemp: number;

  @Prop({ required: true })
  waitTime: number;

  @Prop({ required: true })
  servedTime: number;
}

export const RoomStatusSchema = SchemaFactory.createForClass(RoomStatus);
