import { Consumer } from "../../../domain/entities/Consumer";
import {
  ConsumersRepository,
  LoginConsumerRequest,
  LoginConsumerResponse,
  RegisterConsumerRequest,
  RegisterConsumerResponse,
} from "../../../domain/repositories/consumers-repository";
import {
  addressMapperToDomain,
  consumerMapperToDomain,
} from "../../http/mappers";
import { prisma } from "../prisma";
import brcypt from "bcrypt";

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
}
