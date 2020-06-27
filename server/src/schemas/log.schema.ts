import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EventType } from 'src/types';
import { WindMode, WindSpeed } from 'src/types';

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  roomId: number;

  @Prop({ required: true })
  checkInId: Types.ObjectId;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  eventType: EventType;

  @Prop({ required: true })
  windMode: WindMode;

  @Prop({ required: true })
  windSpeed: WindSpeed;

  @Prop({ required: true })
  curTemp: number;

  @Prop({ required: true })
  targetTemp: number;

  @Prop({ required: true })
  fee: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
