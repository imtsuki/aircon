import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/client')
@UseGuards(JwtAuthGuard)
export class ClientController {}
