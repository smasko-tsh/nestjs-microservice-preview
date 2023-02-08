import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class EventController {
  private readonly logger = new Logger(EventController.name);

  @EventPattern('company-created')
  async handleCompanyCreated(company: Record<string, unknown>) {
    this.logger.log(
      `instance: [${
        process.env.INSTANCE
      }], cmd: [company-created], payload: ${JSON.stringify(company)}`,
    );

    // business logic
  }
}
