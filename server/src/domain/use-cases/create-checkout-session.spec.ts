import { describe, expect, it } from "vitest";
import { InMemoryPurchasesRepository } from "../../tests/disk/in-memory-purchases-repository";
import { CreateCheckoutSessionResponse } from "../repositories/purchases-repository";
import {
  CreateCheckoutSession,
  CreateCheckoutSessionRequest,
} from "./create-checkout-session";

describe("Create a checkout session", async () => {
  it("must be possible to create a checkout session from the id and quantity of the product.", () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const createCheckoutSession = new CreateCheckoutSession(
      purchasesRepository,
    );

    const checkoutProducts: CreateCheckoutSessionRequest = {
      data: [
        {
          id: "AAA",
          quantity: 2,
        },
        {
          id: "BBB",
          quantity: 1,
        },
      ],
    };

    expect(
      createCheckoutSession
        .execute(checkoutProducts)
        .then((data: CreateCheckoutSessionResponse) => {
          console.log('Checkout Session Created!', data.checkoutSession);
          return data;
        }),
    ).resolves.toBeTruthy();

    expect(
      createCheckoutSession
        .execute(checkoutProducts)
        .then(
          (data: CreateCheckoutSessionResponse) =>
            data.checkoutSession?.success_url,
        ),
    ).resolves.toBeTypeOf("string");

    expect(
      createCheckoutSession
        .execute(checkoutProducts)
        .then(
          (data: CreateCheckoutSessionResponse) =>
            data.checkoutSession?.totalAmount,
        ),
    ).resolves.toBeTypeOf("number");
  });

  it("should return an error if the product does not exist.", async () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const createCheckoutSession = new CreateCheckoutSession(
      purchasesRepository,
    );

    const checkoutProduct: CreateCheckoutSessionRequest = {
      data: [
        {
          id: "DDD",
          quantity: 2,
        },
      ],
    };

    expect(
      createCheckoutSession
        .execute(checkoutProduct)
        .then((data: CreateCheckoutSessionResponse) => data),
    ).rejects.toThrow(
      "An error occurred while processing product data and creating a checkout session.",
    );
  });
});
