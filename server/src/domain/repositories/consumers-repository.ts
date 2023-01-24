import { Address } from "../entities/Address";
import { Consumer } from "../entities/Consumer";

export interface RegisterConsumerRequest {
  consumer: Consumer;
  address: Address;
}

export interface RegisterConsumerResponse {
  sessionToken?: string;
  consumer?: Consumer;
  status: boolean;
  message?: string;
}

export interface LoginConsumerRequest {
  email: string;
  password: string;
}

export interface LoginConsumerResponse {
  sessionToken?: string;
  consumer?: Consumer;
  status?: boolean;
  message?: string;
}

export abstract class ConsumersRepository {
  abstract register(
    data: RegisterConsumerRequest,
  ): Promise<RegisterConsumerResponse>;
  abstract login(data: LoginConsumerRequest): Promise<LoginConsumerResponse>;
}
