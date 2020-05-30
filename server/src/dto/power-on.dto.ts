import { WindMode } from 'src/types';

export class PowerOnDto {
  mode: WindMode;
  minTemperature: number;
  maxTemperature: number;
  defaultTemperature: number;
  feeRate: number;
  maxCapacity: number;
}
