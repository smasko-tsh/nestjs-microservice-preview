import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class HttpController {
  private readonly logger = new Logger(HttpController.name);

  constructor(@Inject('service-1') private client: ClientProxy) {}

  @Get()
  getInstance() {
    return process.env.INSTANCE;
  }

  @Get('token')
  async getTokenWithUser() {
    this.logger.log(`instance: [${process.env.INSTANCE}], http: [GET] /token`);

    const user = await lastValueFrom(
      this.client.send({ cmd: 'service-1-get-user' }, '16'),
    );

    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], http: [GET] /token, response from cmd 'service-1-get-user': [${JSON.stringify(
        user,
      )}]`,
    );

    const response = {
      ...user,
      token: Math.random().toString(3),
    };

    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], http: [GET] /token, response: [${JSON.stringify(response)}]`,
    );

    return response;
  }
}
