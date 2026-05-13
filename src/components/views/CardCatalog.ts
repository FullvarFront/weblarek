import { Card, ICard } from "./Card";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";

export interface ICardCatalog extends ICard {
  image: string;
  category: keyof typeof categoryMap;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.imageElement = container.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    this.categoryElement = container.querySelector(
      ".card__category",
    ) as HTMLElement;

    this.container.addEventListener("click", () => {
      this.events.emit("card:select", { id: this._id });
    });
  }

  set image(value: string) {
    this.imageElement.src = value;
  }

  set category(value: keyof typeof categoryMap) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }
}
