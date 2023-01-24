import { randomUUID } from "node:crypto";
import { Address } from "./Address";
import { Purchase } from "./Purchase";

export interface ConsumerProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  cep: string;
  address: Address;
  purchases?: Purchase[];
}

export class Consumer {
  private _id: string;
  private props: ConsumerProps;

  constructor(props: ConsumerProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this.props.id ?? this._id;
  }

  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }
  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }
  public set password(password: string) {
    this.props.password = password;
  }

  public get cep(): string {
    return this.props.cep;
  }
  public set cep(cep: string) {
    this.props.cep = cep;
  }

  public get address(): Address {
    return this.props.address;
  }
  public set address(address: Address) {
    this.props.address = address;
  }
}
