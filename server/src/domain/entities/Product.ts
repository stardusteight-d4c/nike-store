import { randomUUID } from "node:crypto";

export interface ProductProps {
  id?: string;
  title: string;
  subtitle: string;
  price: string;
  img: string;
  stock: number;
  offer?: string;
  oldPrice?: string;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(props: ProductProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this.props.id ? this.props.id : this._id;
  }

  public get title(): string {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
  }

  public get subtitle(): string {
    return this.props.subtitle;
  }
  public set subtitle(subtitle: string) {
    this.props.subtitle = subtitle;
  }

  public get price(): string {
    return this.props.price;
  }
  public set price(price: string) {
    this.props.price = price;
  }

  public get img(): string {
    return this.props.img;
  }
  public set img(img: string) {
    this.props.img = img;
  }

  public get stock(): number {
    return this.props.stock;
  }
  public set stock(stock: number) {
    this.props.stock = stock;
  }

  public get offer(): string | undefined {
    return this.props.offer;
  }
  public set offer(offer: string | undefined) {
    this.props.offer = offer;
  }

  public get oldPrice(): string | undefined {
    return this.props.oldPrice;
  }
  public set oldPrice(oldPrice: string | undefined) {
    this.props.oldPrice = oldPrice;
  }
}
