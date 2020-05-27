import { WindMode, WindSpeed } from 'src/types';

export enum Action {
  ON = 'on',
  OFF = 'off',
}

export class ChangeWindDto {
  readonly action: Action = Action.ON;
  readonly mode: WindMode = WindMode.COOLING;
  readonly speed: WindSpeed = WindSpeed.LOW;
}
