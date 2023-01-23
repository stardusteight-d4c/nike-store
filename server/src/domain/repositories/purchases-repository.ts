type CreateCheckoutSessionRequestData = Array<{
  id: string;
  quantity: number;
}>;

export interface CreateCheckoutSessionResponse {
  proceedToCheckout: boolean;
  checkoutSession?: {
    id: string;
    success_url: string;
    purchaseInfo: Array<{
      productId: string;
      title: string;
      quantity: number;
      totalPrice: number;
    }>;
    totalAmount?: number;
  };
}

export abstract class PurchasesRepository {
  abstract createCheckoutSession(
    data: CreateCheckoutSessionRequestData,
  ): Promise<CreateCheckoutSessionResponse>;
}
