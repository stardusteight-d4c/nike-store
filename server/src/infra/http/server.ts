import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { checkoutRoutes, consumerRoutes } from "./routes/routes";

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
  
  // fastify.register(checkoutRoutes, { prefix: "/api" });

  await fastify.listen({ port: Number(PORT) }).then((url) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap();
