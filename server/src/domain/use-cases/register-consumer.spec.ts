import { describe, expect, it } from "vitest";
import { makeAddress } from "../factories/addresses-factory";
import { makeConsumer } from "../factories/consumers-factory";
import { InMemoryConsumersRepository } from "../disk/in-memory-consumers-repository";
import { Address } from "../entities/Address";
import { Consumer } from "../entities/Consumer";
import { RegisterConsumer } from "./register-consumer";

describe("Register a consumer", () => {
  it("must be possible to register a consumer with an address associated with it.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const registerConsumer = new RegisterConsumer(consumersRepository);

    const consumer1: Consumer = new Consumer(makeConsumer());
    const address: Address = new Address(makeAddress());

    expect(
      registerConsumer
        .execute({ consumer: consumer1, address })
        .then((data) => data),
    ).resolves.toBeTruthy();

    const consumer2: Consumer = new Consumer(
      makeConsumer({ id: "565656269", email: "newEmail@email.com" }),
    );

    expect(
      registerConsumer
        .execute({ consumer: consumer2, address })
        .then((data) => data.consumer),
    ).resolves.toBeInstanceOf(Consumer);
  });

  it("should return an error when trying to register a user with an already existing email.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const registerConsumer = new RegisterConsumer(consumersRepository);

    const consumer: Consumer = new Consumer(makeConsumer());
    const address: Address = new Address(makeAddress());

    registerConsumer.execute({ consumer, address });

    expect(
      registerConsumer.execute({ consumer, address }).then((data) => data),
    ).rejects.toThrow("Email is already in use.");
  });
});
