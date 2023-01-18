import { FastifyReply, FastifyRequest } from "fastify";
import { Address, CreateConsumerRequest } from "../dtos";
import { addressMapper, consumerMapper } from "../mappers";
import { prisma } from "../prisma";
import { TriggersError } from "../utils/TriggersError";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt";
import dotenv from "dotenv";
import { getProductById } from "../graphql/queries";

dotenv.config();

export class ConsumerController {
  async createConsumer(
    request: FastifyRequest<{ Body: CreateConsumerRequest }>,
    reply: FastifyReply,
  ) {
    try {
      const { consumer, address } = request.body;

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
        return reply
          .status(200)
          .send({ message: "email or cep already exist" });
      } else {
        const prismaConsumer = await prisma.consumer.create({
          data: {
            ...consumerMapped,
          },
        });
        const addressMapped: any = addressMapper(address, prismaConsumer.id);
        await prisma.address.create({
          data: {
            ...addressMapped,
          },
        });

        const sessionToken = jwt.sign(
          { id: prismaConsumer.id, email: consumerMapped.email },
          process.env.JWT_SECRET!,
          {
            expiresIn: "4d",
          },
        );

        // @ts-expect-error
        delete prismaConsumer.password;

        return reply
          .status(201)
          .send({ sessionToken, consumer: prismaConsumer });
      }
    } catch (error) {
      new TriggersError(error, reply);
    }
  }

  async findConsumer(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { email, password } = request.body;

      const consumer = await prisma.consumer.findFirst({
        where: {
          email,
        },
      });

      if (consumer) {
        const isValidPassword = await brcypt.compareSync(
          password,
          consumer?.password,
        );
        if (isValidPassword) {
          const sessionToken = jwt.sign(
            { id: consumer.id, email: consumer.email },
            process.env.JWT_SECRET!,
            {
              expiresIn: "4d",
            },
          );

          // @ts-expect-error
          delete consumer.password;

          return reply.status(200).send({ consumer, sessionToken });
        } else {
          return reply
            .status(200)
            .send({ message: "Incorrect email or password" });
        }
      } else {
        return reply
          .status(200)
          .send({ message: "Incorrect email or password" });
      }
    } catch (error) {
      new TriggersError(error, reply);
    }
  }

  async verifySession(
    request: FastifyRequest<{ Headers: { authorization: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const sessionToken = request.headers.authorization;

      const decode: any = jwt.verify(sessionToken, process.env.JWT_SECRET!);

      const consumer = await prisma.consumer.findFirst({
        where: {
          id: decode.id,
        },
      });

      return reply.status(200).send({ session: decode, consumer });
    } catch (error) {
      return reply.send({ msg: "Expired or invalid token" });
    }
  }

  async getAddress(
    request: FastifyRequest<{ Querystring: { consumer_id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const consumer_id = request.query.consumer_id;
      const address = await prisma.address.findFirst({
        where: {
          consumerId: consumer_id,
        },
      });

      return reply.status(200).send({ address });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }

  async newAddress(
    request: FastifyRequest<{ Body: { address: Address; consumerId: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { address, consumerId } = request.body;

      await prisma.address.update({
        where: {
          consumerId,
        },
        data: {
          ...address,
          number: address.number,
        },
      });

      return reply.status(200).send({ message: "Address updated!" });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}
