import { FastifyInstance } from "fastify";
import { CheckoutController } from "../controllers/checkout-controller";
import { ConsumerController } from "../controllers/consumer-controller";

const consumerController = new ConsumerController();
const checkoutController = new CheckoutController();

async function consumerRoutes(fastify: FastifyInstance) {
  fastify.post("/register", consumerController.register);
  fastify.post("/login", consumerController.login);
  fastify.post("/validateSession", consumerController.validateSession);
  fastify.get("/address", consumerController.findAddress);
  fastify.put("/address", consumerController.newAddress);
}

async function checkoutRoutes(fastify: FastifyInstance) {
  fastify.post("/checkout", checkoutController.checkoutSession);
  fastify.post("/make", checkoutController.makePurchase);
}
export { checkoutRoutes, consumerRoutes };
