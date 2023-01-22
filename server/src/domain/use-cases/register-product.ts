import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/products-repository";

export interface RegisterProductResponse {
  status: true | false;
  message: string;
}

export class RegisterProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: Product): Promise<RegisterProductResponse> {
    const { status, message } = await this.productsRepository.register(request);

    if (status === false) {
      throw new Error("Product cannot be registered, see logs.");
    }

    return { status, message };
  }
}
