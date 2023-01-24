import { Address } from "../entities/Address";
import { Consumer } from "../entities/Consumer";
import { makeConsumer } from "../factories/consumers-factory";
import {
  ConsumersRepository,
  LoginConsumerRequest,
  LoginConsumerResponse,
  RegisterConsumerRequest,
} from "../repositories/consumers-repository";
import { RegisterConsumerResponse } from "../repositories/consumers-repository";

export class InMemoryConsumersRepository implements ConsumersRepository {
  public consumers: Consumer[] = [];
  public addresses: Address[] = [];

  async register(
    request: RegisterConsumerRequest,
  ): Promise<RegisterConsumerResponse> {
    const { consumer, address } = request;

    const findConsumerAddress = this.addresses.find(
      (address) => address.consumerId === consumer.id,
    );

    const findEmail = this.consumers.find(
      (consumerObj) => consumerObj.email === consumer.email,
    );

    if (findEmail) {
      return { status: false, message: "Email is already in use." };
    }

    if (!findConsumerAddress) {
      address.consumerId = consumer.id;
      consumer.address = address;

      this.consumers.push(consumer);
      this.addresses.push(address);

      return {
        status: true,
        consumer,
        message: "Customer successfully registered.",
      };
    }

    return {
      status: false,
      message: "An error occurred while registering the consumer.",
    };
  }

  async login(data: LoginConsumerRequest): Promise<LoginConsumerResponse> {
    const { email, password } = data;

    const consumer: Consumer = new Consumer(makeConsumer());
    this.consumers.push(consumer);

    const findEmail = this.consumers.find(
      (consumer) => consumer.email === email,
    );

    if (findEmail) {
      const consumer = findEmail;
      if (consumer.password === password) {
        return { status: true, consumer };
      }
    }

    return { status: false, message: "Invalid password or email." };
  }
}
