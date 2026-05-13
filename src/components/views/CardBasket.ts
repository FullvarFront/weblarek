import { Card, ICard } from "./Card";

export interface ICardBasket extends ICard {
  index: number;
}

export interface ICardBasketActions {
  onDelete: () => void;
}

export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ICardBasketActions) {
    super(container);

    this.indexElement = container.querySelector(
      ".basket__item-index",
    ) as HTMLElement;

    this.deleteButton = container.querySelector(
      ".basket__item-delete",
    ) as HTMLButtonElement;

    this.deleteButton.addEventListener("click", actions.onDelete);
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
