import { FastifyInstance } from "fastify";
import { CheckoutController } from "../controllers/checkout-controller";
import { ConsumerController } from "../controllers/consumer-controller";

const consumerController = new ConsumerController();

async function consumerRoutes(fastify: FastifyInstance) {
  fastify.post("/register", consumerController.register);
  fastify.post("/login", consumerController.login);
  fastify.post("/validateSession", consumerController.validateSession);
  fastify.get("/address", consumerController.address);
  // fastify.put("/newAddress", consumerController.newAddress);
}

async function checkoutRoutes(fastify: FastifyInstance) {
  // fastify.post("/checkout", checkoutController.checkoutSession);
  // fastify.get("/getSession", checkoutController.getSession);
}
export { checkoutRoutes, consumerRoutes };