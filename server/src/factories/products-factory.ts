import { ProductProps } from "../domain/entities/Product";

export function makeProduct(product?: {
  id?: string;
  title?: string;
}): ProductProps {
  return {
    id: product?.id || "aeb4e2a4-7761-4041-9a3b-9a8a2189d4e4",
    title: product?.title || "Air Nike",
    subtitle: "a basketball shoe for hard landings.",
    price: "880,99",
    img: "Not Available",
    stock: 5,
  };
}
