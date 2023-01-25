import { describe, expect, it } from "vitest";
import { InMemoryConsumersRepository } from "../disk/in-memory-consumers-repository";
import { Address } from "../entities/Address";
import { Consumer } from "../entities/Consumer";
import { makeAddress } from "../factories/addresses-factory";
import { makeConsumer } from "../factories/consumers-factory";
import { FindConsumerAddress } from "./find-consumer-address";
import { RegisterConsumer } from "./register-consumer";

describe("Search the address of the consumer", () => {
  it("should be possible to get the consumer's address by its id.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const getConsumerAddress = new FindConsumerAddress(consumersRepository);

    const registerConsumer = new RegisterConsumer(consumersRepository);

    const consumer: Consumer = new Consumer(
      makeConsumer({ id: "68318b586d475d66093cc3dfe4229079" }),
    );
    const address: Address = new Address(makeAddress());

    registerConsumer.execute({ consumer, address });

    expect(
      getConsumerAddress
        .execute({ consumer_id: "68318b586d475d66093cc3dfe4229079" })
        .then((data) => data),
    ).resolves.toBeTruthy();

    expect(
      getConsumerAddress
        .execute({ consumer_id: "68318b586d475d66093cc3dfe4229079" })
        .then((data) => data.address),
    ).resolves.toBeInstanceOf(Address);
  });

  it("should return an error if you enter an invalid id.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const getConsumerAddress = new FindConsumerAddress(consumersRepository);

    const registerConsumer = new RegisterConsumer(consumersRepository);

    const consumer: Consumer = new Consumer(
      makeConsumer({ id: "68318b586d475d66093cc3dfe4229079" }),
    );
    const address: Address = new Address(makeAddress());

    registerConsumer.execute({ consumer, address });

    expect(
      getConsumerAddress
        .execute({ consumer_id: "68318b586d475d66-invalid" })
        .then((data) => data),
    ).rejects.toThrow("Could not find address.");
  });
});
