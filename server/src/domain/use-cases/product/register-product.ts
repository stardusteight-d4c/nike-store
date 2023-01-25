import { Product } from "../../entities/Product";
import { ProductsRepository, RegisterProductResponse } from "../../repositories/products-repository";

export class RegisterProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: Product): Promise<RegisterProductResponse> {
    const { status, message } = await this.productsRepository.register(request);

    if (status === false) {
      throw new Error(message);
    }

    return { status, message };
  }
}
