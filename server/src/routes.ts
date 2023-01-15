import { FastifyInstance } from "fastify";
import { CheckoutController } from "./controllers/checkout-controller";

const checkoutController = new CheckoutController();

async function checkoutRoutes(fastify: FastifyInstance) {
  fastify.post("/checkout", checkoutController.checkoutSession);
  fastify.post("/getSession", checkoutController.getSession);
}

export { checkoutRoutes };