import brcypt from "bcrypt";
import { Address } from "../../../domain/entities/Address";
import { Consumer } from "../../../domain/entities/Consumer";

export async function consumerMapperToDomain(
  data: Consumer,
): Promise<Consumer> {
  const encryptedPassword = await brcypt.hash(data.password, 10);
  const consumer = new Consumer({
    name: data.name,
    email: data.email,
    password: encryptedPassword,
    cep: data.cep,
  });
  return consumer;
}

export function consumerMapperToHttp(data: any) {
  return {
    id: data.props.id,
    name: data.props.name,
    email: data.props.email,
    cep: data.props.cep,
  };
}

export async function addressMapperToDomain(
  data: Address,
  consumerId: string,
): Promise<Address> {
  const address = new Address({
    state: data.state,
    city: data.city,
    neighborhood: data.neighborhood,
    street: data.street,
    number: data.number ?? undefined,
    complement: data.complement ?? undefined,
    consumerId,
  });
  return address;
}

export function addressMapperToHttp(data: any) {
  return {
    id: data.props.id,
    state: data.props.state,
    city: data.props.city,
    neighborhood: data.props.neighborhood,
    street: data.props.street,
    number: data.props.number ?? undefined,
    complement: data.props.complement ?? undefined,
    consumerId: data.props.consumerId,
  };
}

export function toCheckoutMapper(items: []) {
  const newObject = items.map((item: any) => {
    return {
      price_data: {
        currency: "BRL",
        description: item.id,
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
