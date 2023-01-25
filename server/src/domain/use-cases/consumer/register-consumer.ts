import { consumerMapperToHttp } from "../../../infra/http/mappers";
import {
  ConsumersRepository,
  RegisterConsumerRequest,
  RegisterConsumerResponse,
} from "../../repositories/consumers-repository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export class RegisterConsumer {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(
    request: RegisterConsumerRequest,
  ): Promise<RegisterConsumerResponse> {
    const { status, message, consumer } =
      await this.consumersRepository.register(request);

    if (status === false) {
      throw new Error(message);
    }

    const consumerHttp = await consumerMapperToHttp(consumer);
    const sessionToken = jwt.sign(
      { id: consumerHttp.id, email: consumerHttp.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "4d",
      },
    );
    
    return { sessionToken, status, message, consumer };
  }
}
