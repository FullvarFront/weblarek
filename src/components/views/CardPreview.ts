import { Card, ICard } from "./Card";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";

export type TCardButtonState = "buy" | "remove" | "unavailable";

export interface ICardPreview extends ICard {
  image: string;
  category: keyof typeof categoryMap;
  description: string;
  button: TCardButtonState;
}

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.imageElement = container.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    this.categoryElement = container.querySelector(
      ".card__category",
    ) as HTMLElement;

    this.descriptionElement = container.querySelector(
      ".card__text",
    ) as HTMLElement;

    this.buttonElement = container.querySelector(
      ".card__button",
    ) as HTMLButtonElement;

    this.buttonElement.addEventListener("click", () => {
      this.events.emit("card:button-click", { id: this._id });
    });
  }

  set image(value: string) {
    this.imageElement.src = value;
  }

  set category(value: keyof typeof categoryMap) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set button(state: TCardButtonState) {
    if (state === "buy") {
      this.buttonElement.textContent = "Купить";
      this.buttonElement.disabled = false;
    } else if (state === "remove") {
      this.buttonElement.textContent = "Удалить из корзины";
      this.buttonElement.disabled = false;
    } else {
      this.buttonElement.textContent = "Недоступно";
      this.buttonElement.disabled = true;
    }
  }
}
