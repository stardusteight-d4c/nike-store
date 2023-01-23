import { CreateCheckoutSessionResponse, PurchasesRepository } from "../repositories/purchases-repository";

export interface CreateCheckoutSessionRequest {
  data: Array<{
    id: string;
    quantity: number;
  }>;
}

export class CreateCheckoutSession {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute(
    request: CreateCheckoutSessionRequest,
  ): Promise<CreateCheckoutSessionResponse> {
    const { proceedToCheckout, checkoutSession } =
      await this.purchasesRepository.createCheckoutSession(request.data);

    if (proceedToCheckout === false) {
      throw new Error(
        "An error occurred while processing product data and creating a checkout session.",
      );
    }

    return { proceedToCheckout, checkoutSession };
  }
}
