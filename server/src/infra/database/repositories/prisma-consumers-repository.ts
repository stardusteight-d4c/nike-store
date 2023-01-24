import { Consumer } from "../../../domain/entities/Consumer";
import {
  ConsumersRepository,
  RegisterConsumerRequest,
  RegisterConsumerResponse,
} from "../../../domain/repositories/consumers-repository";
import {
  addressMapperToDomain,
  consumerMapperToDomain,
} from "../../http/mappers";
import { prisma } from "../prisma";

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
}
