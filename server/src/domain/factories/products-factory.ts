import { ProductProps } from "../entities/Product";

export function makeProduct(product?: {
  id?: string;
  title?: string;
}): ProductProps {
  return {
    id: product?.id,
    title: product?.title || "Air Nike",
    subtitle: "a basketball shoe for hard landings.",
    price: "880,99",
    img: "Not Available",
    stock: 5,
  };
}
