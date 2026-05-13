import { Card, ICard } from "./Card";
import { categoryMap } from "../../utils/constants";

export interface ICardPreview extends ICard {
  image: string;
  category: keyof typeof categoryMap;
  description: string;
  button: string;
  buttonDisabled: boolean;
}

export interface ICardPreviewActions {
  onClick: () => void;
}

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ICardPreviewActions) {
    super(container);

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

    this.buttonElement.addEventListener("click", actions.onClick);
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

  set button(text: string) {
    this.buttonElement.textContent = text;
  }

  set buttonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
