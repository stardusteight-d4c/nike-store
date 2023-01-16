import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { checkoutRoutes, consumerRoutes } from "./routes";

dotenv.config();
const PORT = process.env.PORT;

async function bootstrap() {
  const fastify = Fastify({
    logger: false,
  });
  fastify.register(cors, {
    origin: process.env.ORIGIN,
  });

  fastify.register(checkoutRoutes, { prefix: "/api" });
  fastify.register(consumerRoutes, { prefix: "/api/consumer" });

  await fastify.listen({ port: Number(PORT) }).then((url) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap();
