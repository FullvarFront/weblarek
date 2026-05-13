import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
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

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
