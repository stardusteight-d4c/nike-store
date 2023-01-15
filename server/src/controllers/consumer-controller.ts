import { FastifyReply, FastifyRequest } from "fastify";
import { CreateConsumerRequest } from "../dtos";
import { addressMapper, consumerMapper } from "../mappers";
import { prisma } from "../prisma";
import { TriggersError } from "../utils/TriggersError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

      const consumerMapped = await consumerMapper(consumer);

      if (cepAlreadyExist || emailAlreadyExist) {
        return reply.status(200).send({ status: "email or cep already exist" });
      } else {
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

      const sessionToken = jwt.sign(
        { name: consumerMapped.name, email: consumerMapped.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "4d",
        },
      );

      return reply.status(201).send({ session: sessionToken, consumer });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}
