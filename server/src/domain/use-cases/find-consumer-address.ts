import {
  ConsumersRepository, FindAddressRequest, FindAddressResponse,
} from "../repositories/consumers-repository";

export class FindConsumerAddress {
  constructor(private consumersRepository: ConsumersRepository) {}

  async execute(request: FindAddressRequest): Promise<FindAddressResponse> {
    const { address, status, message } = await this.consumersRepository.findAddress(
      request,
    );

    if (status === false) {
      throw new Error(message);
    }

    return { address };
  }
}
