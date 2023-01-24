import { randomUUID } from "node:crypto";

export interface AddressProps {
  id?: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  consumerId?: string | undefined; 
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

  public get number(): string {
    return this.props.number;
  }
  public set number(number: string) {
    this.props.number = number;
  }

  public get complement(): string {
    return this.props.complement;
  }
  public set complement(complement: string) {
    this.props.complement = complement;
  }

  public get consumerId(): string | undefined {
    return this.props.consumerId ?? undefined;
  }
  public set consumerId(consumerId: string | undefined) {
    this.props.consumerId = consumerId;
  }
}
