import { FastifyReply, FastifyRequest } from "fastify";
import { TriggersError } from "../../../utils/TriggersError";
import { PrismaPurchasesRepository } from "../../database/repositories/prisma-purchases-repository";
import { CreateCheckoutSession } from "../../../domain/use-cases/purchase/create-checkout-session";
import { CreateCheckoutSessionRequest } from "../../../domain/repositories/purchases-repository";
import Stripe from "stripe";
import { MakePurchaseAfterCheckoutIsComplete } from "../../../domain/use-cases/purchase/make-purchase-after-checkout-is-complete";

export class CheckoutController {
  async checkoutSession(
    request: FastifyRequest<{ Body: CreateCheckoutSessionRequest }>,
    reply: FastifyReply,
  ) {
    const prismaPurchasesRepository = new PrismaPurchasesRepository();
    const service = new CreateCheckoutSession(prismaPurchasesRepository);

    try {
      const products = request.body;

      const result = await service.execute({
        data: products,
      });

      const checkoutSession: Stripe.Checkout.Session = result.checkoutSession;

      console.log(result.checkoutSession);
      

      reply.status(200).redirect(checkoutSession.success_url);
    } catch (error) {
      new TriggersError(error, reply);
    }
  }

  async makePurchase(
    request: FastifyRequest<{
      Querystring: { session_id: string; consumer_id: string };
    }>,
    reply: FastifyReply,
  ) {
    const prismaPurchasesRepository = new PrismaPurchasesRepository();
    const service = new MakePurchaseAfterCheckoutIsComplete(
      prismaPurchasesRepository,
    );

    try {
      const { session_id, consumer_id } = request.query;

      const result = await service.execute(session_id, consumer_id);
      console.log('result', result.session);

      // reply.status(200).send({
      //   session,
      // });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}
