import { randomUUID } from "node:crypto";

export interface PurchaseProps {
  id: string;
  productId: string;
  quantity: string;
  consumerId: string;
}

export class Purchase {
  private _id: string;
  private props: PurchaseProps;

  constructor(props: PurchaseProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get productId(): string {
    return this.props.productId;
  }
  public set productId(productId: string) {
    this.props.productId = productId;
  }

  public get quantity(): string {
    return this.props.quantity;
  }
  public set quantity(quantity: string) {
    this.props.quantity = quantity;
  }

  public get consumerId(): string {
    return this.props.consumerId;
  }
  public set consumerId(consumerId: string) {
    this.props.consumerId = consumerId;
  }
}
