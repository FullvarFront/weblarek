import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IBasketView {
  items: HTMLElement[];
  total: number;
  valid: boolean;
}

export class Basket extends Component<IBasketView> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.listElement = container.querySelector(".basket__list") as HTMLElement;
    this.totalElement = container.querySelector(
      ".basket__price",
    ) as HTMLElement;
    this.submitButton = container.querySelector(
      ".basket__button",
    ) as HTMLButtonElement;

    this.submitButton.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  set items(items: HTMLElement[]) {
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Корзина пуста";
      this.listElement.replaceChildren(empty);
    } else {
      this.listElement.replaceChildren(...items);
    }
  }

  set total(value: number) {
    this.totalElement.textContent = `${value} синапсов`;
  }

  set valid(isValid: boolean) {
    this.submitButton.disabled = !isValid;
  }
}
