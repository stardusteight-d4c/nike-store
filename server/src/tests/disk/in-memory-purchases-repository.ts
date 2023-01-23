import { Product } from "../../domain/entities/Product";
import {
  CreateCheckoutSessionResponse,
  PurchasesRepository,
  Session,
} from "../../domain/repositories/purchases-repository";
import { makeProduct } from "../../factories/products-factory";
import { mergeArrayOfObjectsByIdProperty } from "../../utils/mergeArrayOfObjectsByIdProperty";
import { stringPriceToNumber } from "../../utils/stringPriceToNumber";
import { randomUUID } from "node:crypto";

type CheckoutSession = {
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

export class InMemoryPurchasesRepository implements PurchasesRepository {
  public products: Product[] = [];
  public checkoutSessionInformation: CheckoutSession = {
    id: "",
    success_url: "",
    purchaseInfo: [],
  };
  public checkoutSessions: CheckoutSession[] = [];

  async createCheckoutSession(
    data: { id: string; quantity: number }[],
  ): Promise<CreateCheckoutSessionResponse> {
    this.products.push(new Product(makeProduct({ id: "AAA", title: "AAA" })));
    this.products.push(new Product(makeProduct({ id: "BBB", title: "BBB" })));
    this.products.push(new Product(makeProduct({ id: "CCC", title: "CCC" })));

    const purchaseProductsIds: string[] = data.map(
      (product: any) => product.id,
    );

    // console.log("data", data);
    // console.log("purchaseProductsIds", purchaseProductsIds);
    // console.log("products", this.products);

    const purchaseProductsData = this.products.filter((product) =>
      purchaseProductsIds.includes(product.id),
    );

    if (purchaseProductsData.length > 0) {
      const mergeArray = mergeArrayOfObjectsByIdProperty(
        purchaseProductsData,
        data,
      );

      // console.log("purchaseProductsData", purchaseProductsData);
      // console.log("mergeArray", mergeArray);

      let purchaseInfo: any = [];
      const totalArray = mergeArray.map((product: any) => {
        const totalPrice =
          stringPriceToNumber(product.props.price) * product.quantity;
        const toPurchaseInfo = {
          productId: product.props.id,
          title: product.props.title,
          quantity: product.quantity,
          totalPrice,
        };
        purchaseInfo.push(toPurchaseInfo);
        return totalPrice;
      });

      const totalAmount = totalArray.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      );

      this.checkoutSessionInformation.id = randomUUID();
      this.checkoutSessionInformation.success_url = `http://localhost:5173/?session_id=${this.checkoutSessionInformation.id}`;

      this.checkoutSessionInformation.purchaseInfo.push(purchaseInfo);

      const parsedFloat = parseFloat(totalAmount).toFixed(2);
      this.checkoutSessionInformation.totalAmount = Number(parsedFloat);

      this.checkoutSessions.push(this.checkoutSessionInformation);

      const checkoutSession = this.checkoutSessionInformation;
      this.checkoutSessionInformation = {
        id: "",
        success_url: "",
        purchaseInfo: [],
      };

      return {
        proceedToCheckout: true,
        checkoutSession,
      };
    }

    return { proceedToCheckout: false };
  }

  make(session_id: string, consumer_id: string): Promise<Session> {
    throw new Error("Method not implemented.");
  }
}
