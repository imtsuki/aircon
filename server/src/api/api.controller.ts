import { Get, Request, UseGuards, Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api')
export class ApiController {
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
