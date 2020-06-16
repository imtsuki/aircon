import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CheckInModule } from './check-in/check-in.module';
import { StatisticsModule } from './statistics/statistics.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/aircon', {
      useFindAndModify: false,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    SchedulerModule,
    CheckInModule,
    StatisticsModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
