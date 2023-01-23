import { describe, expect, it } from "vitest";
import { InMemoryPurchasesRepository } from "../../tests/disk/in-memory-purchases-repository";
import {
  CreateCheckoutSession,
  CreateCheckoutSessionRequest,
} from "./create-checkout-session";

describe("Create a checkout session", () => {
  it("must be possible to create a checkout session", () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const createCheckoutSession = new CreateCheckoutSession(
      purchasesRepository
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

    createCheckoutSession.execute(checkoutProducts);
  });
});
