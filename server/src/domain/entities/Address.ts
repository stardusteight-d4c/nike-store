import { randomUUID } from "node:crypto";

export interface AddressProps {
  id?: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string  | null;
  complement?: string | null;
  consumerId: string;
}

export class Address {
  private _id: string;
  private props: AddressProps;

  constructor(props: AddressProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this.props.id ? this.props.id : this._id;
  }

  public get state(): string {
    return this.props.state;
  }
  public set state(state: string) {
    this.props.state = state;
  }

  public get city(): string {
    return this.props.city;
  }
  public set city(city: string) {
    this.props.city = city;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }
  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get street(): string {
    return this.props.street;
  }
  public set street(street: string) {
    this.props.street = street;
  }

  public get number(): string | undefined | null {
    return this.props.number;
  }
  public set number(number: string | undefined | null) {
    this.props.number = number;
  }

  public get complement(): string | undefined | null {
    return this.props.complement;
  }
  public set complement(complement: string | undefined | null) {
    this.props.complement = complement;
  }

  public get consumerId(): string {
    return this.props.consumerId;
  }
  public set consumerId(consumerId: string) {
    this.props.consumerId = consumerId;
  }
}
