import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

const getTokenCmd = 'service-2-get-token';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  @MessagePattern({ cmd: getTokenCmd })
  getToken(seed: number) {
    this.logger.log(
      `instance: [${process.env.INSTANCE}], cmd: [${getTokenCmd}], payload: ${seed}`,
    );

    const response = Math.random().toString(seed);

    this.logger.log(
      `instance: [${process.env.INSTANCE}], cmd: [${getTokenCmd}], response: ${response}`,
    );

    return response;
  }
}
