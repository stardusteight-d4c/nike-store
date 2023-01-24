import { describe, expect, it } from "vitest";
import { InMemoryConsumersRepository } from "../disk/in-memory-consumers-repository";
import { ValidateSession } from "./validate-session";

describe("Validate a consumer session", () => {
  it("should be possible to validate a consumer session with an encoded token.", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const validateSession = new ValidateSession(consumersRepository);

    expect(
      validateSession
        .execute({ encodedToken: "c949ce7276db1e9f84f8a7e598e0b6ae" })
        .then((data) => data),
    ).resolves.toBeTruthy();
  });

  it("should return an error if the operation cannot be performed with the token sent (invalid token).", async () => {
    const consumersRepository = new InMemoryConsumersRepository();
    const validateSession = new ValidateSession(consumersRepository);

    expect(
      validateSession
        .execute({ encodedToken: "c949c9f84f8a7e598e0b6ae-invalid" })
        .then((data) => data),
    ).rejects.toThrow('Invalid or expired token.');
  });
});
