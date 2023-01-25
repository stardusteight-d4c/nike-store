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

    if (!session) {
      return {
        status: false,
        message: "There was an error acquiring information about this session.",
      };
    }

    await Promise.all(
      session.data.map(async (product) => {
        const stripeProductId: any = product?.price!.product;
        const stripeProduct = await stripe.products
          .retrieve(stripeProductId)
          // @ts-ignore
          .then((data) => (product.hygraphId = data.metadata.hygraphId));
        return stripeProduct;
      }),
    );

    const findSession = await prisma.purchase.findFirst({
      where: {
        sessionId: session_id,
      },
    });

    if (!findSession) {
      session.data.map(
        async (product) =>
          await prisma.purchase.create({
            data: {
              // @ts-ignore
              productId: product.hygraphId,
              quantity: product.quantity?.toString()!,
              consumerId: consumer_id,
              sessionId: session_id,
            },
          }),
      );
      return {
        status: true,
        session: session.data,
        message: "Purchase made successfully.",
      };
    }
    return {
      status: false,
      message: "There was an error acquiring information about this session.",
    };
  }
}
