import { Address } from "../entities/Address";
import { Consumer } from "../entities/Consumer";

export interface RegisterConsumerRequest {
  consumer: Consumer;
  address: Address;
}

export interface RegisterConsumerResponse {
  consumer?: Consumer;
  status: boolean;
  message?: string;
}

export abstract class ConsumersRepository {
  abstract register(
    data: RegisterConsumerRequest,
  ): Promise<RegisterConsumerResponse>;
}
