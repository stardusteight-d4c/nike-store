import { FastifyReply, FastifyRequest } from "fastify";
import { TriggersError } from "../../../utils/TriggersError";
import dotenv from "dotenv";
import { RegisterConsumer } from "../../../domain/use-cases/register-consumer";
import { PrismaConsumersRepository } from "../../database/repositories/prisma-consumers-repository";
import { Address, AddressProps } from "../../../domain/entities/Address";
import { Consumer, ConsumerProps } from "../../../domain/entities/Consumer";
import jwt from "jsonwebtoken";
import { consumerMapperToHttp } from "../mappers";

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

      if (result.status === true) {
        const consumerHttp = await consumerMapperToHttp(result.consumer);
        const sessionToken = jwt.sign(
          { id: consumerHttp.id, email: consumerHttp.email },
          process.env.JWT_SECRET!,
          {
            expiresIn: "4d",
          },
        );

        return reply.status(201).send({ sessionToken, consumer: consumerHttp });
      }
    } catch (error) {
      new TriggersError(error, reply);
    }
  }
}

// async findConsumer(
//   request: FastifyRequest<{ Body: { email: string; password: string } }>,
//   reply: FastifyReply,
// ) {
//   try {
//     const { email, password } = request.body;

//     const consumer = await prisma.consumer.findFirst({
//       where: {
//         email,
//       },
//     });

//     if (consumer) {
//       const isValidPassword = await brcypt.compareSync(
//         password,
//         consumer?.password,
//       );
//       if (isValidPassword) {
//         const sessionToken = jwt.sign(
//           { id: consumer.id, email: consumer.email },
//           process.env.JWT_SECRET!,
//           {
//             expiresIn: "4d",
//           },
//         );

//         // @ts-expect-error
//         delete consumer.password;

//         return reply.status(200).send({ consumer, sessionToken });
//       } else {
//         return reply
//           .status(200)
//           .send({ message: "Incorrect email or password" });
//       }
//     } else {
//       return reply
//         .status(200)
//         .send({ message: "Incorrect email or password" });
//     }
//   } catch (error) {
//     new TriggersError(error, reply);
//   }
// }

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
