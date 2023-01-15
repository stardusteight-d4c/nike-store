import { FastifyReply, FastifyRequest } from "fastify";
import { CreateConsumerRequest } from "../dtos";

export class CheckoutController {
  async createConsumer(
    request: FastifyRequest<{ Body: CreateConsumerRequest }>,
    reply: FastifyReply,
  ) {
    const { name, email, password, cep } = request.body;
  }
}
