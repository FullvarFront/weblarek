import { Card, ICard } from "./Card";
import { IEvents } from "../base/Events";

export interface ICardBasket extends ICard {
  index: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.indexElement = container.querySelector(
      ".basket__item-index",
    ) as HTMLElement;

    this.deleteButton = container.querySelector(
      ".basket__item-delete",
    ) as HTMLButtonElement;

    this.deleteButton.addEventListener("click", () => {
      this.events.emit("basket:remove", { id: this._id });
    });
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
