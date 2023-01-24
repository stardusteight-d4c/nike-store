import { Consumer } from "../entities/Consumer";
import {
  ConsumersRepository,
  RegisterConsumerRequest,
  RegisterConsumerResponse,
} from "../repositories/consumers-repository";

export class RegisterConsumer {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(request: RegisterConsumerRequest): Promise<RegisterConsumerResponse> {
    const { status, message, consumer } =
      await this.consumersRepository.register(request);

    if (status === false) {
      throw new Error(message);
    }

    return { status, message, consumer };
  }
}
