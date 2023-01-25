import Stripe from "stripe";
import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  MakePurchaseResponse,
  PurchasesRepository,
} from "../../../domain/repositories/purchases-repository";
import { mergeArrayOfObjectsByIdProperty } from "../../../utils/mergeArrayOfObjectsByIdProperty";
import { getProductById } from "../../http/graphql/queries";
import { toCheckoutMapper } from "../../http/mappers";
import dotenv from "dotenv";
import { stripe } from "../../http/stripe";
import { prisma } from "../prisma";

dotenv.config();

export class PrismaPurchasesRepository implements PurchasesRepository {
  async createCheckoutSession(
    data: CreateCheckoutSessionRequest,
  ): Promise<CreateCheckoutSessionResponse> {
    const products = data;

    const ids: string[] = products.map(
      (product: { id: string; quantity: number }) => product.id,
    );

    // Acquire product information from a DB or Content Manage System
    // Ensure data integrity, that it has not been intercepted by an
    // intermediary (through the front end)
    const productData = await getProductById(ids);
    const mergeArray = mergeArrayOfObjectsByIdProperty(productData, products);

    // Product price information must be handled only by the application server
    // This is the shape in which stripe expects the data to be
    const transformedItems = toCheckoutMapper(mergeArray);

    const result = mergeArray.map(
      (product: { stock: number; quantity: number }) => {
        if (product.quantity > product.stock) {
          return false;
        } else {
          return true;
        }
      },
    );

    if (result.includes(false)) {
      return {
        proceedToCheckout: false,
        message: "There is an item that exceeds the stock quantity.",
      };
    }

    // Create checkout sessions from body params
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.ORIGIN}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.ORIGIN}/`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return { proceedToCheckout: true, checkoutSession };
  }

  async make(
    session_id: string,
    consumer_id: string,
  ): Promise<MakePurchaseResponse> {
    const session = await stripe.checkout.sessions.listLineItems(session_id);
    // const product = await stripe.products.retrieve("prod_NEhdrQjNfFE03M");

    // console.log("session", session);
    // console.log("session.data.price", session.data[0].price);

    const stripeProducts = await Promise.all (session.data.map(async (product) => {
      const stripeProductId: any = product?.price!.product;
      const stripeProduct = await stripe.products
        .retrieve(stripeProductId)
        .then((data) => data);
      return stripeProduct;
    }))

    console.log("stripeProducts", stripeProducts);

    // console.log("product", product);

    // prod_NEfCWuHD06ZNKn

    // fetch(
    //   "https://api.stripe.com/v1/checkout/sessions/cs_test_a1XOW8d8VpDiBonReSiyBCZMFU97AteE2ofB44X815bVKNmkcUCAvVZInv/line_items",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.SECRET_KEY!}`,
    //     },
    //   },
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    // session.data.map(
    //   async (product) =>
    //     await prisma.purchase.create({
    //       data: {
    //         productId: product.id,
    //         quantity: product.quantity?.toString()!,
    //         consumerId: consumer_id,
    //       },
    //     }),
    // );

    const obj: any = {};
    return obj;
  }
}
