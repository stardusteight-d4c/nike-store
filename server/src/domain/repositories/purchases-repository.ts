type CreateCheckoutSessionRequestData = Array<{
  id: string;
  quantity: number;
}>;

export type Session = {
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

export interface CreateCheckoutSessionResponse {
  proceedToCheckout: boolean;
  checkoutSession?: Session;
  message?: string
}

export abstract class PurchasesRepository {
  abstract createCheckoutSession(
    data: CreateCheckoutSessionRequestData,
  ): Promise<CreateCheckoutSessionResponse>;
  abstract make(
    session_id: string,
    consumer_id: string,
  ): Promise<{session?: Session, status: boolean}>;
}
