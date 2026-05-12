import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";

export class CardCatalog<T> extends Card<T> {
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

  setImage(src: string, alt?: string): void {
    super.setImage(this.imageElement, src, alt);
  }

  setCategory(value: keyof typeof categoryMap): void {
    this.categoryElement.textContent = value;
    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }
}
