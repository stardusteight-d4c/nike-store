import {
  AddressRequest,
  AddressResponse,
  ConsumersRepository,
} from "../repositories/consumers-repository";
import dotenv from "dotenv";

dotenv.config();

export class FindConsumerAddress {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(request: AddressRequest): Promise<AddressResponse> {
    const { address, status, message } = await this.consumersRepository.address(
      request,
    );

    if (status === false) {
      throw new Error(message);
    }

    return { address };
  }
}
