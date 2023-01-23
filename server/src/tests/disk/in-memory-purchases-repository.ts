import { Purchase } from "@prisma/client";
import { Product } from "../../domain/entities/Product";
import { PurchasesRepository } from "../../domain/repositories/purchases-repository";
import { CreateCheckoutSessionResponse } from "../../domain/use-cases/create-checkout-session";
import { makeProduct } from "../../factories/products-factory";
import { mergeArrayOfObjectsByIdProperty } from "../../utils/merge-array-of-objects-by-id-property";
import { stringPriceToNumber } from "../../utils/string-price-to-number";

export class InMemoryPurchasesRepository implements PurchasesRepository {
  public products: Product[] = [];
  public purchases: Purchase[] = [];

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

    console.log("purchaseProductsData", purchaseProductsData);
    const mergeArray = mergeArrayOfObjectsByIdProperty(
      purchaseProductsData,
      data,
    );

    if (purchaseProductsData.length > 0) {
      let purchaseInfo: any = [];
      const totalArray = mergeArray.map((product: any) => {
        const totalPrice =
          stringPriceToNumber(product.props.price) * product.quantity;
        const toPurchaseInfo = {
          productId: product.props.id,
          title: product.title,
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

      const parsedFloat = parseFloat(totalAmount).toFixed(2);
      return {
        proceedToCheckout: true,
        purchaseInfo,
        totalAmount: Number(parsedFloat),
      };
    }

    return { proceedToCheckout: false };
  }
}
