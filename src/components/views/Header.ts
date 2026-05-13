import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header<T> extends Component<T> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.basketButton = container.querySelector(
      ".header__basket",
    ) as HTMLButtonElement;

    this.counterElement = container.querySelector(
      ".header__basket-counter",
    ) as HTMLElement;

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  setCounter(value: number): void {
    this.counterElement.textContent = String(value);
  }
}
