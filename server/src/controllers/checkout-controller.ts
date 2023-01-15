import { FastifyReply, FastifyRequest } from "fastify";
import Stripe from "stripe";
import { stripe } from "../stripe";

export class CheckoutController {
  async checkoutSession(
    request: FastifyRequest<{ Body: { items: any } }>,
    reply: FastifyReply,
  ) {
    const items = request.body.items;

    console.log("items", items);
    console.log("headers-origin", request.headers.origin);

    // Product price information must be handled only by the application server
    // This is the shape in which stripe expects the data to be
    const transformedItems = items.map((item: any) => ({
      price_data: {
        currency: "BRL",
        product_data: {
          name: item.title,
          // images: item.img,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    console.log("transformedItems", transformedItems);

    try {
      // Create checkout sessions from body params
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: transformedItems,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${request.headers.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.headers.origin}/`,
        // metadata: {
        //   images: JSON.stringify(
        //     items.map((item: any) => item.image),
        //   ),
        // },
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      reply.status(200).send(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      reply.status(500).send({ statusCode: 500, message: errorMessage });
    }
  }

  async getSession(
    request: FastifyRequest<{ Querystring: { session_id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const sessionId = request.query.session_id;
      const session = await stripe.checkout.sessions.listLineItems(sessionId);
      reply.status(200).send({
        session,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      reply.status(500).send({ statusCode: 500, message: errorMessage });
    }
  }
}
