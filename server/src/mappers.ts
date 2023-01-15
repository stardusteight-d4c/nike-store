import { Address, Consumer } from "./dtos";
import brcypt from 'bcrypt'

export async function consumerMapper(data: Consumer) {
  const encryptedPassword = await brcypt.hash(data.password, 10)
  return {
    name: data.fullName,
    email: data.emailAddress,
    password: encryptedPassword,
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