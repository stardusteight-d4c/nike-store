import { describe, expect, it } from "vitest";
import { makeProduct } from "../../factories/products-factory";
import { InMemoryProductsRepository } from "../disk/in-memory-products-repository";
import { Product } from "../entities/Product";
import { RegisterProductResponse } from "../repositories/products-repository";
import { RegisterProduct } from "./register-product";

describe("Register a product", () => {
  it("must be possible to register a product.", () => {
    const productsRepository = new InMemoryProductsRepository();
    const registerProduct = new RegisterProduct(productsRepository);

    const product1 = new Product(makeProduct({ title: "AAA" }));
    const product2 = new Product(makeProduct({ title: "BBB" }));
    const product3 = new Product(makeProduct({ title: "CCC" }));

    expect(
      registerProduct
        .execute(product1)
        .then((data: RegisterProductResponse) => data),
    ).resolves.toBeTruthy();

    expect(
      registerProduct
        .execute(product2)
        .then((data: RegisterProductResponse) => data.status),
    ).resolves.toEqual(true);

    expect(
      registerProduct
        .execute(product3)
        .then((data: RegisterProductResponse) => data.message),
    ).resolves.toBeTypeOf("string");
  });

  it("must not be possible to register a product with the same title or id.", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const registerProduct = new RegisterProduct(productsRepository);

    const product1 = new Product(makeProduct());
    await registerProduct.execute(product1);

    const product2 = new Product(makeProduct({ title: "MyTitle" }));
    const product3 = new Product(
      makeProduct({ id: "YourID", title: "YourTitle" }),
    );

    await registerProduct.execute(product2);

    expect(
      registerProduct
        .execute(product1)
        .then((data: RegisterProductResponse) => data),
    ).rejects.toThrow("There was an error registering this new product.");

    expect(
      registerProduct
        .execute(product3)
        .then((data: RegisterProductResponse) => data),
    ).resolves.toBeTruthy();
  });
});
