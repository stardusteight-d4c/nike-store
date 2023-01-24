import { Product } from "../../domain/entities/Product";
import {
  CreateCheckoutSessionResponse,
  MakePurchaseResponse,
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
  public consumers: {
    id: string;
    purchases: CheckoutSession[];
    cep: string;
  }[] = [
    {
      id: "a8f8d60ea2a48fc662326ceb6372c99d",
      purchases: [],
      cep: "76811-114",
    },
    {
      id: "8a76dd1bbd2833f9f78611eee28d00c4",
      purchases: [],
      cep: "69305-220",
    },
    {
      id: "b08e28184709a38d9ceeb583e24e8842",
      purchases: [],
      cep: "69059-340",
    },
  ];

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

      let purchaseInfo: any = [];
      const totalArray = mergeArray.map((product: any) => {
        if (product.quantity > product.props.stock) {
          return false;
        }

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

      if (totalArray.includes(false)) {
        return {
          proceedToCheckout: false,
          message: "There is an item that exceeds the stock quantity.",
        };
      }

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

    return {
      proceedToCheckout: false,
      message:
        "An error occurred while processing product data and creating a checkout session.",
    };
  }

  async make(
    session_id: string,
    consumer_id: string,
  ): Promise<MakePurchaseResponse> {
    this.checkoutSessions = [
      {
        id: "3387d124-c3c1-45b7-826a-463d7d9fd46a",
        success_url:
          "http://localhost:5173/?session_id=3387d124-c3c1-45b7-826a-463d7d9fd46a",
        purchaseInfo: [
          {
            productId: "AAA",
            title: "AAA",
            quantity: 2,
            totalPrice: 1761.98,
          },
          { productId: "BBB", title: "BBB", quantity: 1, totalPrice: 880.99 },
        ],
        totalAmount: 2642.97,
      },
    ];

    const session = this.checkoutSessions.find(
      (session) => session.id === session_id,
    );

    const consumer = this.consumers.find(
      (consumer) => consumer.id === consumer_id,
    );

    if (session !== undefined && consumer) {
      consumer.purchases.push(session);
      return { session, status: true };
    }

    

    return {
      status: false,
      message: "There was an error acquiring information about this session.",
    };
  }
}
