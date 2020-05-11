import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApiController {
  @Get('profile')
  @Roles('client', 'desk', 'manager', 'admin')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
