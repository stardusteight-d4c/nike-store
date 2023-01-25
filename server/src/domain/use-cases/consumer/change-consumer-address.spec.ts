import { describe, expect, it } from "vitest";
import { InMemoryConsumersRepository } from "../../disk/in-memory-consumers-repository";
import { Address } from "../../entities/Address";
import { Consumer } from "../../entities/Consumer";
import { makeAddress } from "../../factories/addresses-factory";
import { makeConsumer } from "../../factories/consumers-factory";
import { ChangeConsumerAddress } from "./change-consumer-address";
import { RegisterConsumer } from "./register-consumer";

describe("Change the consumer's address", () => {
  it("must be possible for the consumer to change his address.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const changeConsumerAddress = new ChangeConsumerAddress(
      consumersRepository,
    );
    const registerConsumer = new RegisterConsumer(consumersRepository);

    const consumer: Consumer = new Consumer(
      makeConsumer({ id: "373bbac91fc7286ba239cf3cf7fc1a7b" }),
    );
    const address = new Address(makeAddress());

    registerConsumer.execute({ address, consumer });

    expect(
      changeConsumerAddress
        .execute({ address, consumerId: "373bbac91fc7286ba239cf3cf7fc1a7b" })
        .then((data) => data),
    ).resolves.toBeTruthy();
  });

  it("should return an error if you send a non-existent consumer id.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const changeConsumerAddress = new ChangeConsumerAddress(
      consumersRepository,
    );
    const registerConsumer = new RegisterConsumer(consumersRepository);

    const consumer: Consumer = new Consumer(
      makeConsumer({ id: "373bbac91fc7286ba239cf3cf7fc1a7b" }),
    );
    const address = new Address(makeAddress());

    registerConsumer.execute({ address, consumer });

    expect(
      changeConsumerAddress
        .execute({ address, consumerId: "373bba1fc7286ba239cf3cf7fc1a7b" })
        .then((data) => data),
    ).rejects.toThrow("An error occurred while trying to update the address.");
  });
});
