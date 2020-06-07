import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CheckInDto, ChangeWindDto, PowerOnDto } from 'src/dto';
import { CheckInService } from 'src/check-in/check-in.service';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { Action } from 'src/dto/change-wind.dto';
import { StatisticsService } from 'src/statistics/statistics.service';

@ApiBearerAuth()
@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApiController {
  constructor(
    private schedulerService: SchedulerService,
    private checkInService: CheckInService,
    private statisticsService: StatisticsService,
  ) {}

  @Get('profile')
  @Roles('client', 'desk', 'manager', 'admin')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @ApiOperation({ description: '开关机，更改房间风速' })
  @Put('room/:roomId/wind')
  @Roles('client')
  changeWind(
    @Param('roomId') roomId: string,
    @Body() changeWind: ChangeWindDto,
  ) {
    if (changeWind.action == Action.ON) {
      this.schedulerService.changeWind(parseInt(roomId), changeWind.speed);
    } else {
      this.schedulerService.turnOff(parseInt(roomId));
    }
  }

  @ApiOperation({ description: '查看房间空调状态' })
  @Get('room/:roomId/status')
  @Roles('client')
  getStatus(@Param('roomId') roomId: string) {
    return this.schedulerService.getStatus(parseInt(roomId));
  }

  @ApiOperation({ description: '客户查看已消费金额' })
  @Get('bill')
  @Roles('client')
  getBilling() {
    return;
  }

  @ApiOperation({ description: '前台操作客户入住' })
  @Post('checkin')
  @Roles('desk')
  async checkIn(@Body() checkIn: CheckInDto) {
    return this.checkInService.checkIn(checkIn);
  }

  @ApiOperation({ description: '前台操作客户退房' })
  @Delete('checkin/:username')
  @Roles('desk')
  async checkOut(@Param('username') username: string) {
    return this.checkInService.checkOut(username);
  }

  @ApiOperation({ description: '查看客户住在哪个房间' })
  @Get('checkin/:username')
  @Roles('desk', 'client')
  async getCheckInStatus(@Param('username') username: string) {
    const checkIn = await this.checkInService.getCheckInByUsername(username);
    if (checkIn) {
      return checkIn;
    } else {
      throw new NotFoundException(`user ${username} not checked in`);
    }
  }

  @ApiOperation({ description: '前台获得客户账单' })
  @Get('invoice/:username')
  @Roles('desk')
  getInvoice(@Param('username') username: string) {
    console.log(username);
    return;
  }

  @ApiOperation({ description: '前台获得客户详单' })
  @Get('detail/:username')
  @Roles('desk')
  getDetail(@Param('username') username: string) {
    console.log(username);
    return;
  }

  @ApiOperation({ description: '经理查看统计报表' })
  @Get('report')
  @Roles('manager')
  getReport() {
    return;
  }

  @ApiOperation({ description: '管理员配置并打开主控机' })
  @Post('poweron')
  @Roles('admin')
  powerOn(@Body() powerOn: PowerOnDto) {
    return powerOn;
  }

  @ApiOperation({ description: '管理员查看房间状态' })
  @Get('status')
  @Roles('admin')
  getRoomStatus() {
    return;
  }

  @ApiOperation({ description: '管理员关闭主控机' })
  @Delete('poweroff')
  @Roles('admin')
  powerOff() {
    return;
  }
}
