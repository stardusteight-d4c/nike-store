import { describe, expect, it } from "vitest";
import { InMemoryConsumersRepository } from "../disk/in-memory-consumers-repository";
import { Consumer } from "../entities/Consumer";
import { LoginConsumer } from "./login-consumer";

describe("Login a consumer", () => {
  it("must be possible to create a user session with the consumer's credentials.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const loginConsumer = new LoginConsumer(consumersRepository);

    expect(
      loginConsumer
        .execute({ email: "example@email.com", password: "password" })
        .then((data) => data),
    ).resolves.toBeTruthy();

    expect(
      loginConsumer
        .execute({ email: "example@email.com", password: "password" })
        .then((data) => data.consumer),
    ).resolves.toBeInstanceOf(Consumer);
  });

  it("must be return an error if email or password are incorrect.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const loginConsumer = new LoginConsumer(consumersRepository);

    expect(
      loginConsumer
        .execute({ email: "examle@email.com", password: "password" })
        .then((data) => data),
    ).rejects.toThrow("Invalid password or email.");
  });
});
