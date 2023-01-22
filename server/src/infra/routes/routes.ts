import { FastifyInstance } from "fastify";
import { CheckoutController } from "../controllers/checkout-controller";
import { ConsumerController } from "../controllers/consumer-controller";

const checkoutController = new CheckoutController();
const consumerController = new ConsumerController();

// criar camada core/domain e de arquitetura

async function checkoutRoutes(fastify: FastifyInstance) {
  fastify.post("/checkout", checkoutController.checkoutSession);
  fastify.get("/getSession", checkoutController.getSession);
}

async function consumerRoutes(fastify: FastifyInstance) {
  fastify.post("/createConsumer", consumerController.createConsumer);
  fastify.post("/findConsumer", consumerController.findConsumer);
  fastify.post("/verifySession", consumerController.verifySession);
  fastify.get("/address", consumerController.getAddress);
  fastify.put("/newAddress", consumerController.newAddress);
}

export { checkoutRoutes, consumerRoutes };
