import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal<T> extends Component<T> {
  protected content: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.content = container.querySelector(".modal__content") as HTMLElement;
    this.closeButton = container.querySelector(
      ".modal__close",
    ) as HTMLButtonElement;

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });

    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  setContent(node: HTMLElement): void {
    this.content.replaceChildren(node);
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
  }
}
