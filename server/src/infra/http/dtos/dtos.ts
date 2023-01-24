export interface CreateConsumerRequest {
  consumer: Consumer;
  address: Address;
}

export type Consumer = {
  name: string;
  email: string;
  password: string;
  cep: string;
};

export type Address = {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
};
