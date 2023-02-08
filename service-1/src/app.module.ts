import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './event.controller';
import { HttpController } from './http.controller';
import { MessageController } from './message.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'service-2',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL],
        },
      },
    ]),
  ],
  controllers: [HttpController, EventController, MessageController],
})
export class AppModule {}
