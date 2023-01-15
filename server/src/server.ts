import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { checkoutRoutes } from "./routes";

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

  await fastify.listen({ port: Number(PORT) });
}

bootstrap();
