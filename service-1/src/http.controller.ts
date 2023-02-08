import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Controller()
export class HttpController {
  private readonly logger = new Logger(HttpController.name);

  constructor(@Inject('service-2') private client: ClientProxy) {}

  @Get()
  getHello() {
    return process.env.INSTANCE;
  }

  @Get('user')
  async getUserWithToken() {
    this.logger.log(`instance: [${process.env.INSTANCE}], http: [GET] /user`);

    const token = await lastValueFrom(
      this.client.send({ cmd: 'service-2-get-token' }, 16),
    );

    this.logger.log(
      `instance: [${process.env.INSTANCE}], http: [GET] /user, response from cmd 'service-2-get-token': [${token}]`,
    );

    // business logic

    const response = {
      id: uuid(),
      token,
    };

    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], http: [GET] /user, response: [${JSON.stringify(response)}]`,
    );

    return response;
  }
}
