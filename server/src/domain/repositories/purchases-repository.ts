export abstract class PurchasesRepository {
  abstract createCheckoutSession(
    data: Array<{
      id: string;
      quantity: number;
    }>,
  ): Promise<{
    proceedToCheckout: boolean;
    purchaseInfo?:  Array<{
      productId: string;
      title: string;
      quantity: number;
      totalPrice: number;
    }>;
    totalAmount?: number
  }>;
}
