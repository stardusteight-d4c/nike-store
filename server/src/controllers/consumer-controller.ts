import { FastifyReply, FastifyRequest } from "fastify";
import { CreateConsumerRequest } from "../dtos";
import { addressMapper, consumerMapper } from "../mappers";
import { prisma } from "../prisma";
import { TriggersError } from "../utils/TriggersError";

export class ConsumerController {
  async createConsumer(
    request: FastifyRequest<{ Body: CreateConsumerRequest }>,
    reply: FastifyReply,
  ) {
    try {
      const { consumer, address } = request.body;

      console.log(request.body);

      const cepAlreadyExist = await prisma.consumer.findFirst({
        where: {
          cep: consumer.cep,
        },
      });
      const emailAlreadyExist = await prisma.consumer.findFirst({
        where: {
          email: consumer.emailAddress,
        },
      });

      if (cepAlreadyExist || emailAlreadyExist) {
        return reply.status(200).send({ status: "email or cep already exist" });
      } else {
        const consumerMapped = consumerMapper(consumer);
        const prismaConsumer = await prisma.consumer.create({
          data: {
            ...consumerMapped,
          },
        });
        const addressMapped = addressMapper(address, prismaConsumer.id);
        await prisma.address.create({
          data: {
            ...addressMapped,
          },
        });
      }

      return reply.status(201).send({ status: "created" });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}
