import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

const getUserCmd = 'service-1-get-user';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(@Inject('service-2') private client: ClientProxy) {}

  @MessagePattern({ cmd: getUserCmd })
  getUser(id: string) {
    this.logger.log(
      `instance: [${process.env.INSTANCE}], cmd: [${getUserCmd}], payload: ${id}`,
    );

    // business logic

    const response = {
      id,
      firstName: 'john',
      lastName: 'doe',
    };

    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], cmd: [${getUserCmd}], response: ${JSON.stringify(response)}`,
    );

    return response;
  }
}
