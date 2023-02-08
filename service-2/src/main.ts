import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    name: process.env.NAME,
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL],
      queue: process.env.NATS_QUEUE,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
