import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { checkoutRoutes } from "./routes";

async function bootstrap() {
  dotenv.config();
  const fastify = Fastify({
    logger: false,
  });
  fastify.register(cors, {
    origin: true,
  });
  fastify.register(checkoutRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
