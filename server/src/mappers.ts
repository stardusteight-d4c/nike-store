import { Address, Consumer } from "./dtos";

export function consumerMapper(data: Consumer) {
  return {
    name: data.fullName,
    email: data.emailAddress,
    password: data.password,
    cep: data.cep
  }
}

export function addressMapper(data: Address, consumerId: string) {
  return {
    ...data,
    number: Number(data.number),
    consumerId,
  }
}