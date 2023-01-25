import Fastify from "fastify";
import cors from "@fastify/cors";
import { checkoutRoutes, consumerRoutes } from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

async function bootstrap() {
  const fastify = Fastify({
    logger: false,
  });
  fastify.register(cors, {
    origin: process.env.ORIGIN,
  });

  fastify.register(consumerRoutes, { prefix: "/api/consumer" });
  fastify.register(checkoutRoutes, { prefix: "/api/purchase" });

  await fastify.listen({ port: Number(PORT) }).then((url) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap();
