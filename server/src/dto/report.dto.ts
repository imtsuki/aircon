export class ReportDto {
  type: 'day' | 'week' | 'month';
  usedMostTemp: number[];
  usedMostWind: number[];
  time: number[];
  timeOfServing: number[];
  numOfRDR: number[];
  totalFee: number[];
}
