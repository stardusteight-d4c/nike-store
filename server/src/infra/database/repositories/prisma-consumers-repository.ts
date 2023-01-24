import { Consumer } from "../../../domain/entities/Consumer";
import {
  ConsumersRepository,
  LoginConsumerRequest,
  LoginConsumerResponse,
  RegisterConsumerRequest,
  RegisterConsumerResponse,
  ValidateSessionRequest,
  ValidateSessionResponse,
} from "../../../domain/repositories/consumers-repository";
import {
  addressMapperToDomain,
  consumerMapperToDomain,
} from "../../http/mappers";
import { prisma } from "../prisma";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class PrismaConsumersRepository implements ConsumersRepository {
  async register(
    data: RegisterConsumerRequest,
  ): Promise<RegisterConsumerResponse> {
    const { consumer, address } = data;

    const emailAlreadyExist = await prisma.consumer.findFirst({
      where: {
        email: consumer.email,
      },
    });

    const consumerMapped = await consumerMapperToDomain(consumer);

    if (emailAlreadyExist) {
      return { status: false, message: "Email is already in use." };
    } else {
      const prismaConsumer = await prisma.consumer.create({
        data: {
          name: consumerMapped.name,
          email: consumerMapped.email,
          password: consumerMapped.password,
          cep: consumerMapped.cep,
        },
      });

      const addressMapped = await addressMapperToDomain(
        address,
        prismaConsumer.id,
      );

      await prisma.address.create({
        data: {
          state: addressMapped.state,
          city: addressMapped.city,
          neighborhood: addressMapped.neighborhood,
          street: addressMapped.street,
          number: addressMapped.number,
          complement: addressMapped.complement,
          consumerId: addressMapped.consumerId,
        },
      });

      const prismaProps = new Consumer(prismaConsumer);

      return {
        status: true,
        consumer: prismaProps,
        message: "Successfully registered user.",
      };
    }
  }

  async login(data: LoginConsumerRequest): Promise<LoginConsumerResponse> {
    const { email, password } = data;

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
        const domainConsumer = new Consumer(consumer);
        return { status: true, consumer: domainConsumer };
      }
    }
    return { status: false, message: "Invalid password or email." };
  }

  async validateSession(
    data: ValidateSessionRequest,
  ): Promise<ValidateSessionResponse> {
    const sessionToken = data.encodedToken;

    try {
      const decode: any = jwt.verify(sessionToken, process.env.JWT_SECRET!);

      if (decode) {
        const consumer = await prisma.consumer.findFirst({
          where: {
            id: decode.id,
          },
        });
        if (consumer) {
          const consumerToDomain = new Consumer(consumer);
          return { consumer: consumerToDomain, decodedToken: decode };
        }
      }

      return { status: false, message: "Invalid or expired token." };
    } catch (error: any) {
      return { status: false, message: error };
    }
  }
}
