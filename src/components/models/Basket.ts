import { IProduct } from "../../types";

export class Basket {
  protected items: IProduct[] = [];

  addItem(item: IProduct): void {
    this.items.push(item);
  }

  removeItem(item: IProduct): void {
    this.items = this.items.filter((i) => i.id !== item.id);
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
  }
}
