import {
  PurchasesRepository,
  Session,
} from "../repositories/purchases-repository";

export class MakePurchaseAfterCheckoutIsComplete {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute(session_id: string, consumer_id: string): Promise<Session> {
    const session = await this.purchasesRepository.make(
      session_id,
      consumer_id,
    );

    if (!session) {
      throw new Error(
        "There was an error acquiring information about this session.",
      );
    }

    return session;
  }
}
