import {
  ConsumersRepository,
  ValidateSessionRequest,
  ValidateSessionResponse,
} from "../../repositories/consumers-repository";
import dotenv from "dotenv";

dotenv.config();

export class ValidateSession {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(
    request: ValidateSessionRequest,
  ): Promise<ValidateSessionResponse> {
    const { decodedToken, consumer, message, status } =
      await this.consumersRepository.validateSession(request);

    if (status === false) {
      throw new Error(message);
    }

    return { decodedToken, consumer };
  }
}
