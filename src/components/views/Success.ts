import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success<T> extends Component<T> {
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.descriptionElement = container.querySelector(
      ".order-success__description",
    ) as HTMLElement;

    this.closeButton = container.querySelector(
      ".order-success__close",
    ) as HTMLButtonElement;

    this.closeButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  setTotal(value: number): void {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}
