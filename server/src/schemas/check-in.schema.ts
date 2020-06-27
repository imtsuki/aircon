import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CheckIn extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  roomId: number;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  fee: number;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
