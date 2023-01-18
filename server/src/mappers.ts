import { Address, Consumer } from "./dtos";
import brcypt from "bcrypt";

export async function consumerMapper(data: Consumer) {
  const encryptedPassword = await brcypt.hash(data.password, 10);
  return {
    name: data.fullName,
    email: data.emailAddress,
    password: encryptedPassword,
    cep: data.cep,
  };
}

export function addressMapper(data: Address, consumerId: string) {
  return {
    ...data,
    number: data.number,
    consumerId,
  };
}

export function toCheckoutMapper(items: []) {
  const newObject = items.map((item: any) => {
    return {
      price_data: {
        currency: "BRL",
        product_data: {
          name: item.title,
          images: [item.img.url],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  return newObject;
}
