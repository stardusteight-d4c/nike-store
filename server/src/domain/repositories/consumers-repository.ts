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

export interface ValidateSessionRequest {
  encodedToken: string;
}

export interface ValidateSessionResponse {
  decodedToken?: {};
  consumer?: Consumer;
  status?: boolean;
  message?: string;
}

export interface FindAddressRequest {
  consumer_id: string;
}

export interface FindAddressResponse {
  address?: Address;
  status?: boolean;
  message?: string;
}

export interface NewAddressRequest {
  address: Address;
  consumerId: string;
}

export interface NewAddressResponse {
  status?: boolean;
  message?: string;
}

export abstract class ConsumersRepository {
  abstract register(
    data: RegisterConsumerRequest,
  ): Promise<RegisterConsumerResponse>;

  abstract login(data: LoginConsumerRequest): Promise<LoginConsumerResponse>;

  abstract validateSession(
    data: ValidateSessionRequest,
  ): Promise<ValidateSessionResponse>;

  abstract findAddress(data: FindAddressRequest): Promise<FindAddressResponse>;
  
  abstract newAddress(data: NewAddressRequest): Promise<NewAddressResponse>;
}
