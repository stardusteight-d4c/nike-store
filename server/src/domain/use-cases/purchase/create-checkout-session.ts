import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  PurchasesRepository,
} from "../../repositories/purchases-repository";

export class CreateCheckoutSession {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute(request: {
    data: CreateCheckoutSessionRequest;
  }): Promise<CreateCheckoutSessionResponse> {
    const { proceedToCheckout, checkoutSession, message } =
      await this.purchasesRepository.createCheckoutSession(request.data);

    if (proceedToCheckout === false) {
      throw new Error(message);
    }

    return { proceedToCheckout, checkoutSession };
  }
}
