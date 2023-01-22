import { FastifyReply, FastifyRequest } from "fastify";
import Stripe from "stripe";
import { getProductById } from "../graphql/queries";
import { toCheckoutMapper } from "../mappers";
import { prisma } from "../prisma";
import { stripe } from "../stripe";
import { TriggersError } from "../utils/TriggersError";

export class CheckoutController {
  async checkoutSession(
    request: FastifyRequest<{ Body: { items: any } }>,
    reply: FastifyReply,
  ) {
    try {
      const items = request.body.items;
      const ids = items.map((item: any) => item.id);

      // Acquire product information from a DB or Content Manage System
      // Ensure data integrity, that it has not been intercepted by an
      // intermediary (through the front end)
      const cmsData = await getProductById(ids);

      function mergeArrayOfObjectsByIdProperty(array1: any, array2: any) {
        const array3 = array1.map((obj1: any) => ({
          ...obj1,
          ...array2.find((obj2: any) => obj2.id === obj1.id),
        }));

        return array3;
      }

      const mergeArray = mergeArrayOfObjectsByIdProperty(cmsData, items);

      // Product price information must be handled only by the application server
      // This is the shape in which stripe expects the data to be
      const transformedItems = toCheckoutMapper(mergeArray);

      const result = mergeArray.map((item: any) => {
        if (item.qty > item.stock) {
          return false;
        } else {
          return true;
        }
      });

      const isValid = result.find((element: boolean) => element === false);

      // Create checkout sessions from body params
      if (isValid === undefined && isValid !== false) {
        const params: Stripe.Checkout.SessionCreateParams = {
          payment_method_types: ["card"],
          line_items: transformedItems,
          payment_intent_data: {},
          mode: "payment",
          success_url: `${request.headers.origin}?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.headers.origin}/`,
        };

        const checkoutSession: Stripe.Checkout.Session =
          await stripe.checkout.sessions.create(params);

        reply.status(200).send(checkoutSession);
      } else {
        reply.send({ message: "Product quantity exceeds stock" });
      }
    } catch (error) {
      new TriggersError(error, reply);
    }
  }

  async getSession(
    request: FastifyRequest<{
      Querystring: { session_id: string; consumer_id: string };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const { session_id, consumer_id } = request.query;
      const session = await stripe.checkout.sessions.listLineItems(session_id);

      session.data.map(
        async (product) =>
          await prisma.purchase.create({
            data: {
              productId: product.id,
              quantity: product.quantity?.toString()!,
              consumerId: consumer_id,
            },
          }),
      );

      reply.status(200).send({
        session,
      });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}
