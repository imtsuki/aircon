import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';

@Module({
  providers: [CheckInService],
  exports: [CheckInService],
})
export class CheckInModule {}
