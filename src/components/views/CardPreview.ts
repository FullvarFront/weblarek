import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";

export class CardPreview<T> extends Card<T> {
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

  setImage(src: string, alt?: string): void {
    super.setImage(this.imageElement, src, alt);
  }

  setCategory(value: keyof typeof categoryMap): void {
    this.categoryElement.textContent = value;
    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }

  setDescription(value: string): void {
    this.descriptionElement.textContent = value;
  }

  setButton(state: "buy" | "remove" | "unavailable"): void {
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
