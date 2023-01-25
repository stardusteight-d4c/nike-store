import {
  ConsumersRepository,
  NewAddressRequest,
  NewAddressResponse,
} from "../repositories/consumers-repository";

export class ChangeConsumerAddress {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(request: NewAddressRequest): Promise<NewAddressResponse> {
    const { status, message } = await this.consumersRepository.newAddress(
      request,
    );

    if (status === false) {
      throw new Error(message);
    }

    return { status, message };
  }
}
