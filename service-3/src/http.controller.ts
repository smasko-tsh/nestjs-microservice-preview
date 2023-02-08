import { Controller, Get, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';

@Controller()
export class HttpController {
  private readonly logger = new Logger(HttpController.name);

  @Client({
    transport: Transport.NATS,
    options: { servers: [process.env.NATS_URL] },
  })
  client: ClientProxy;

  @Get()
  getHello() {
    return process.env.INSTANCE;
  }

  @Get('company')
  createCompany() {
    this.logger.log(
      `instance: [${process.env.INSTANCE}], http: [GET] /company`,
    );

    const company = {
      id: uuid(),
      name: uuid(),
    };

    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], http: [GET] /company, emitted event: [company-created] with payload: [${JSON.stringify(
        company,
      )}]`,
    );

    this.client.emit('company-created', company);

    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], http: [GET] /company, response: [${JSON.stringify(company)}]`,
    );

    return company;
  }
}
