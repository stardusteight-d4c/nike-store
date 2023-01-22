export abstract class PurchasesRepository {
  abstract make(
    data: {
      id: string;
      quantity: string;
    },
    consumerId: string,
  ): Promise<{ proceedToCheckout: boolean; totalPrice: number }>;
}
