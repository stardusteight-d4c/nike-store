import {
  ConsumersRepository,
  LoginConsumerRequest,
  LoginConsumerResponse,
} from "../repositories/consumers-repository";
import { consumerMapperToHttp } from "../../infra/http/mappers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class LoginConsumer {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(request: LoginConsumerRequest): Promise<LoginConsumerResponse> {
    const { consumer, message, status } = await this.consumersRepository.login(
      request,
    );
    console.log("status", status);

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

    return { sessionToken, consumer };
  }
}
