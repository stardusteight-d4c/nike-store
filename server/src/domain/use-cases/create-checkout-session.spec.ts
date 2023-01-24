import { describe, expect, it } from "vitest";
import { InMemoryPurchasesRepository } from "../disk/in-memory-purchases-repository";
import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
} from "../repositories/purchases-repository";
import { CreateCheckoutSession } from "./create-checkout-session";

describe("Create a checkout session", async () => {
  it("must be possible to create a checkout session from the id and quantity of the product.", () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const createCheckoutSession = new CreateCheckoutSession(
      purchasesRepository,
    );

    const checkoutProducts: { data: CreateCheckoutSessionRequest } = {
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
          // console.log('Checkout Session Created!', data.checkoutSession);
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

    const checkoutProduct: { data: CreateCheckoutSessionRequest } = {
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

  it("should throw an error if an item exceeds the stock limit.", async () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const createCheckoutSession = new CreateCheckoutSession(
      purchasesRepository,
    );

    const checkoutProducts: { data: CreateCheckoutSessionRequest } = {
      data: [
        {
          id: "AAA",
          quantity: 2,
        },
        {
          id: "BBB",
          quantity: 7,
        },
      ],
    };

    expect(
      createCheckoutSession
        .execute(checkoutProducts)
        .then((data: CreateCheckoutSessionResponse) => data),
    ).rejects.toThrow("There is an item that exceeds the stock quantity.");
  });
});
