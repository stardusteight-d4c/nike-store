import { Address } from "../entities/Address";
import { Consumer } from "../entities/Consumer";
import { makeConsumer } from "../factories/consumers-factory";
import {
  ConsumersRepository,
  FindAddressRequest,
  FindAddressResponse,
  LoginConsumerRequest,
  LoginConsumerResponse,
  NewAddressRequest,
  NewAddressResponse,
  RegisterConsumerRequest,
  ValidateSessionRequest,
  ValidateSessionResponse,
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

  async validateSession(
    data: ValidateSessionRequest,
  ): Promise<ValidateSessionResponse> {
    const { encodedToken } = data;

    const consumer: Consumer = new Consumer(makeConsumer());
    this.consumers.push(consumer);

    // simulation of a generic token check
    function verifyToken(encodedToken: string) {
      const consumerToken = "c949ce7276db1e9f84f8a7e598e0b6ae";
      const verifyToken = encodedToken === consumerToken;
      if (verifyToken) {
        const decodedToken = {
          id: "180790068254449ce83cc2e16bd45745",
          email: "example@gmail.com",
        };
        return decodedToken;
      } else {
        return false;
      }
    }

    const decodedToken = verifyToken(encodedToken);

    if (decodedToken) {
      const consumer = this.consumers.find(
        (consumer) => consumer.id === decodedToken.id,
      );
      if (consumer) {
        return { consumer, decodedToken, status: true };
      }
    }

    return { status: false, message: "Invalid or expired token." };
  }

  async findAddress(data: FindAddressRequest): Promise<FindAddressResponse> {
    const { consumer_id } = data;

    const address = this.addresses.find(
      (address) => address.consumerId === consumer_id,
    );

    if (address) {
      return { status: true, address };
    }

    return { status: false, message: "Could not find address." };
  }

  async newAddress(data: NewAddressRequest): Promise<NewAddressResponse> {
    const { address, consumerId } = data;

    const consumerAddress = this.addresses.find(
      (address) => address.consumerId === consumerId,
    );

    if (consumerAddress) {
      const index = this.addresses.indexOf(consumerAddress);
      const newAddress = new Address(address);
      if (index > -1) {
        this.addresses[index] = newAddress;
      }
      return {
        status: true,
        message: "Successfully updated address.",
      };
    }

    return {
      status: false,
      message: "An error occurred while trying to update the address.",
    };
  }
}
