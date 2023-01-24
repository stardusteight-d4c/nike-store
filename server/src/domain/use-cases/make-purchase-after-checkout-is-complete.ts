import {
  MakePurchaseResponse,
  PurchasesRepository,
} from "../repositories/purchases-repository";

export class MakePurchaseAfterCheckoutIsComplete {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute(
    session_id: string,
    consumer_id: string,
  ): Promise<MakePurchaseResponse> {
    const { session, status, message } = await this.purchasesRepository.make(
      session_id,
      consumer_id,
    );

    if (status === false) {
      throw new Error(message);
    }
    
    return { session, status };
  }
}
