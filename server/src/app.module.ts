import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientController } from './client/client.controller';
import { ApiController } from './api/api.controller';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, ClientController, ApiController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
