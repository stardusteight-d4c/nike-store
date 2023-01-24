import { Product } from "../entities/Product";

export interface RegisterProductResponse {
  status: true | false;
  message: string;
}

export abstract class ProductsRepository {
  abstract register(
    data: Product,
  ): Promise<RegisterProductResponse>;
}
