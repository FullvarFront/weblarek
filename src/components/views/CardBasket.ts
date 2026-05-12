import { Card } from "./Card";
import { IEvents } from "../base/Events";

export class CardBasket<T> extends Card<T> {
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
      this.events.emit("basket-remove", { id: this._id });
    });
  }

  setIndex(value: number): void {
    this.indexElement.textContent = String(value);
  }
}
