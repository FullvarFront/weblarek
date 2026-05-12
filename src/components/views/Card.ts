import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export abstract class Card<T> extends Component<T> {
  protected _id: string = "";
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  protected constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.titleElement = container.querySelector(".card__title") as HTMLElement;
    this.priceElement = container.querySelector(".card__price") as HTMLElement;
  }

  setId(value: string): void {
    this._id = value;
  }

  getId(): string {
    return this._id;
  }

  setTitle(value: string): void {
    this.titleElement.textContent = value;
  }

  setPrice(value: number | null): void {
    if (value === null) {
      this.priceElement.textContent = "Бесценно";
    } else {
      this.priceElement.textContent = `${value} синапсов`;
    }
  }
}
