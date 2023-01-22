import { Product as ProductGRAPHQL} from "@/graphql/generated";

export function toAppMapper(data: ProductGRAPHQL | any): Product {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    offer: data.offer,
    oldPrice: data.oldPrice,
    img: data.img.url,
    price: data.price,
    stock: data.stock,
  }
}
