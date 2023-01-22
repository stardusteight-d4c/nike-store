import { Product } from "../entities/Product";

export abstract class ProductsRepository {
  abstract register(
    data: Product,
  ): Promise<{ status: true | false; message: string }>;
}
