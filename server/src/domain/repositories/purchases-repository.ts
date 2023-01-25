export type CreateCheckoutSessionRequest = Array<{
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
  checkoutSession?: Session | any;
  message?: string;
}

export interface MakePurchaseResponse {
  session?: Session;
  status: boolean;
  message?: string;
}

export abstract class PurchasesRepository {
  abstract createCheckoutSession(
    data: CreateCheckoutSessionRequest,
  ): Promise<CreateCheckoutSessionResponse>;

  abstract make(
    session_id: string,
    consumer_id: string,
  ): Promise<MakePurchaseResponse>;
}
