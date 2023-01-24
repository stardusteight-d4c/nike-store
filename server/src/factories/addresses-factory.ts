import { AddressProps } from "../domain/entities/Address";

export function makeAddress(address?: {
  id?: string;
  email?: string;
}): AddressProps {
  return {
    id: address?.id ?? "180790068254449ce83cc2e16bd45745",
    state: 'SP',
    city: 'Narnia',
    neighborhood: 'Brooklyn',
    street: 'Tatooine',
    complement: 'Cave',
    number: '42',
  };
}
