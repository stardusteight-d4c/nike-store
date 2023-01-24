import { Product } from "../../domain/entities/Product";
import { ProductsRepository, RegisterProductResponse } from "../../domain/repositories/products-repository";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async register(data: Product): Promise<RegisterProductResponse> {
    const findById = this.products.find(
      (product) => product.id === data.id,
    );
    const findByTitle = this.products.find(
      (product) => product.title === data.title,
    );

    if (!findByTitle && !findById) {
      this.products.push(data);
    }

    if (this.products.length > 0 && !findByTitle && !findById) {
      return { status: true, message: "New product successfully added." };
    } else {
      return {
        status: false,
        message: "There was an error registering this new product.",
      };
    }
  }
}
