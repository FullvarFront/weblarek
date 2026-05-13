import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface ICard {
  id: string;
  title: string;
  price: number | null;
}

export abstract class Card<T extends ICard> extends Component<T> {
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

  set id(value: string) {
    this._id = value;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number | null) {
    this.priceElement.textContent =
      value === null ? "Бесценно" : `${value} синапсов`;
  }
}
