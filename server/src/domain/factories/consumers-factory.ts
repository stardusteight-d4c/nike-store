import { ConsumerProps } from "../../domain/entities/Consumer";

export function makeConsumer(consumer?: {
  id?: string;
  email?: string;
}): ConsumerProps {
  return {
    id: consumer?.id ?? "180790068254449ce83cc2e16bd45745",
    email: consumer?.email ?? "example@email.com",
    name: "José Gomes",
    password: "password",
    cep: "69914-790",
  };
}
