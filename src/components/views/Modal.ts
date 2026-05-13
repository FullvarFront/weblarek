import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.contentElement = container.querySelector(
      ".modal__content",
    ) as HTMLElement;
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

  set content(node: HTMLElement) {
    this.contentElement.replaceChildren(node);
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
  }
}
