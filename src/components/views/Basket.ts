import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Basket<T> extends Component<T> {
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

  setItems(items: HTMLElement[]): void {
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Корзина пуста";
      this.listElement.replaceChildren(empty);
    } else {
      this.listElement.replaceChildren(...items);
    }
  }

  setTotal(value: number): void {
    this.totalElement.textContent = `${value} синапсов`;
  }

  setValid(isValid: boolean): void {
    this.submitButton.disabled = !isValid;
  }
}
