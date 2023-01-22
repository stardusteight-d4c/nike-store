import { Product } from "../../domain/entities/Product";
import { ProductsRepository } from "../../domain/repositories/products-repository";
import { RegisterProductResponse } from "../../domain/use-cases/register-product";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async register(data: Product): Promise<RegisterProductResponse> {

    const findById = this.products.find(
      (product) => product.id === data.id,
    );
    const findByTitle = this.products.find(
      (product) => product.title === data.title,
    );

    if (!findByTitle) {
      this.products.push(data);
    }

    if (this.products.length > 0 && !findByTitle && !findById) {
      return { status: true, message: "New product successfully added." };
    } else {
      return {
        status: false,
        message: "There was an error registering this new product",
      };
    }
  }
}
