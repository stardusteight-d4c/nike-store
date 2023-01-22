import { PurchasesRepository } from "../repositories/purchases.repository";

export interface MakePurchaseResponse {
  proceedToCheckout: boolean;
  totalPrice: number;
}

export class makePurchase {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute(request: {
    data: {
      id: string;
      quantity: string;
    };
    consumerId: string;
  }): Promise<MakePurchaseResponse> {
    const { proceedToCheckout, totalPrice } =
      await this.purchasesRepository.make(request.data, request.consumerId);

    if (proceedToCheckout === false) {
      throw new Error(
        "An error occurred while processing data and creating checkout session.",
      );
    }

    return { proceedToCheckout, totalPrice };
  }
}
