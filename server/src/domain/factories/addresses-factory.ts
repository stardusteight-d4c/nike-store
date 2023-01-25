import { AddressProps } from "../entities/Address";

export function makeAddress(address?: {
  id?: string;
  email?: string;
  consumerId?: string;
}): AddressProps {
  return {
    id: address?.id ?? "180790068254449ce83cc2e16bd45745",
    state: "SP",
    city: "Narnia",
    neighborhood: "Brooklyn",
    street: "Tatooine",
    complement: "Cave",
    number: "42",
    consumerId: address?.consumerId ?? "45daf026577bfbe7b8b6946f26ccc600",
  };
}
