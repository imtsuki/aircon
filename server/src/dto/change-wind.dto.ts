import { WindMode, WindSpeed } from 'src/types';

export enum Command {
  TURN_ON = 'turnOn',
  TURN_OFF = 'turnOff',
  CHANGE_MODE = 'changeMode',
  CHANGE_SPEED = 'changeSpeed',
  CHANGE_TARGET = 'changeTarget',
}

export class ChangeWindDto {
  readonly command: Command = Command.TURN_ON;
  readonly mode: WindMode = WindMode.COOLING;
  readonly speed: WindSpeed = WindSpeed.MEDIUM;
  readonly targetTemp: number = 25;
}
