import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
  protected items: IProduct[] = [];

  constructor(protected events: IEvents) {}

  addItem(item: IProduct): void {
    this.items.push(item);
    this.events.emit("basket:changed", this.items);
  }

  removeItem(item: IProduct): void {
    this.items = this.items.filter((i) => i.id !== item.id);
    this.events.emit("basket:changed", this.items);
  }

  getCount(): number {
    return this.items.length;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price ?? 0), 0);
  }

  hasItem(id: string): boolean {
    return this.items.some((item) => id === item.id);
  }

  clear(): void {
    this.items = [];
    this.events.emit("basket:changed", this.items);
  }
}
