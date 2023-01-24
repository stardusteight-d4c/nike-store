import { FastifyReply, FastifyRequest } from "fastify";
import { TriggersError } from "../../../utils/TriggersError";
import dotenv from "dotenv";
import { RegisterConsumer } from "../../../domain/use-cases/register-consumer";
import { PrismaConsumersRepository } from "../../database/repositories/prisma-consumers-repository";
import { Address, AddressProps } from "../../../domain/entities/Address";
import { Consumer, ConsumerProps } from "../../../domain/entities/Consumer";
import { consumerMapperToHttp } from "../mappers";
import { LoginConsumerRequest } from "../../../domain/repositories/consumers-repository";
import { LoginConsumer } from "../../../domain/use-cases/login-consumer";

dotenv.config();

export class ConsumerController {
  async register(
    request: FastifyRequest<{
      Body: { consumer: ConsumerProps; address: AddressProps };
    }>,
    reply: FastifyReply,
  ) {
    const prismaConsumersRepository = new PrismaConsumersRepository();
    const service = new RegisterConsumer(prismaConsumersRepository);

    try {
      const { consumer, address } = request.body;

      const addressToDomain = new Address(address);
      const consumerToDomain = new Consumer(consumer);

      const result = await service.execute({
        consumer: consumerToDomain,
        address: addressToDomain,
      });

      const consumerHttp = await consumerMapperToHttp(result.consumer);

      return reply
        .status(201)
        .send({ sessionToken: result.sessionToken, consumer: consumerHttp });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }

  async login(
    request: FastifyRequest<{
      Body: LoginConsumerRequest;
    }>,
    reply: FastifyReply,
  ) {
    const prismaConsumersRepository = new PrismaConsumersRepository();
    const service = new LoginConsumer(prismaConsumersRepository);

    try {
      const { email, password } = request.body;

      const result = await service.execute({
        email,
        password,
      });

      const consumerHttp = await consumerMapperToHttp(result.consumer);

      return reply
        .status(200)
        .send({ sessionToken: result.sessionToken, consumer: consumerHttp });
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}

// TRANSFORMAR EM UM MIDDLEWARE
// async verifySession(
//   request: FastifyRequest<{ Headers: { authorization: string } }>,
//   reply: FastifyReply,
// ) {
//   try {
//     const sessionToken = request.headers.authorization;

//     const decode: any = jwt.verify(sessionToken, process.env.JWT_SECRET!);

//     const consumer = await prisma.consumer.findFirst({
//       where: {
//         id: decode.id,
//       },
//     });

//     return reply.status(200).send({ session: decode, consumer });
//   } catch (error) {
//     return reply.send({ msg: "Expired or invalid token" });
//   }
// }

// async getAddress(
//   request: FastifyRequest<{ Querystring: { consumer_id: string } }>,
//   reply: FastifyReply,
// ) {
//   try {
//     const consumer_id = request.query.consumer_id;
//     const address = await prisma.address.findFirst({
//       where: {
//         consumerId: consumer_id,
//       },
//     });

//     return reply.status(200).send({ address });
//   } catch (error) {
//     new TriggersError(error, reply);
//   }
// }

// async newAddress(
//   request: FastifyRequest<{ Body: { address: Address; consumerId: string } }>,
//   reply: FastifyReply,
// ) {
//   try {
//     const { address, consumerId } = request.body;

//     await prisma.address.update({
//       where: {
//         consumerId,
//       },
//       data: {
//         ...address,
//         number: address.number,
//       },
//     });

//     return reply.status(200).send({ message: "Address updated!" });
//   } catch (error) {
//     new TriggersError(error, reply);
//   }
// }
