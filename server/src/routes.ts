import { FastifyInstance } from "fastify";
import { CheckoutController } from "./controllers/checkout-controller";
import { ConsumerController } from "./controllers/consumer-controller";

const checkoutController = new CheckoutController();
const consumerController = new ConsumerController();

async function checkoutRoutes(fastify: FastifyInstance) {
  fastify.post("/checkout", checkoutController.checkoutSession);
  fastify.get("/getSession", checkoutController.getSession);
}

async function consumerRoutes(fastify: FastifyInstance) {
  fastify.post("/createConsumer", consumerController.createConsumer);
}

export { checkoutRoutes, consumerRoutes };
