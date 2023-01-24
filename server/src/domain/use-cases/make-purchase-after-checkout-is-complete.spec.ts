import { describe, expect, it } from "vitest";
import { InMemoryPurchasesRepository } from "../disk/in-memory-purchases-repository";
import { Session } from "../repositories/purchases-repository";
import { MakePurchaseAfterCheckoutIsComplete } from "./make-purchase-after-checkout-is-complete";

describe("Make a purchase", async () => {
  it("must be possible to make a purchase by associating the data from a previous checkout session with a consumer after confirming the checkout and payment.", () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const makePurchaseAfterCheckoutIsComplete =
      new MakePurchaseAfterCheckoutIsComplete(purchasesRepository);

    expect(
      makePurchaseAfterCheckoutIsComplete
        .execute(
          "3387d124-c3c1-45b7-826a-463d7d9fd46a",
          "8a76dd1bbd2833f9f78611eee28d00c4",
        )
        .then((data: { session?: Session; status: boolean }) => {
          // console.log("Session", data);
          return data.session;
        }),
    ).resolves.toBeTruthy();
  });


  it("must be return an error when searching for a non-existing checkout session or pass a non-existent consumer.", async () => {
    const purchasesRepository = new InMemoryPurchasesRepository();
    const makePurchaseAfterCheckoutIsComplete =
      new MakePurchaseAfterCheckoutIsComplete(purchasesRepository);

    expect(
      makePurchaseAfterCheckoutIsComplete
        .execute(
          "3387d124-cc1-45b7-826a-INVALID-SESSION_ID",
          "8a76dd1bbd2833f9f7611eee28d00c4",
        )
        .then((data: { session?: Session; status: boolean }) => data),
    ).rejects.toThrow(
      "There was an error acquiring information about this session.",
    );

    expect(
      makePurchaseAfterCheckoutIsComplete
        .execute(
          "3387d124-c3c1-45b7-826a-463d7d9fd46a",
          "8a76dd1bbd289f7611eee28d00c4-INVALID-CONSUMER_ID",
        )
        .then((data: { session?: Session; status: boolean }) => data),
    ).rejects.toThrow(
      "There was an error acquiring information about this session.",
    );
  });
});
