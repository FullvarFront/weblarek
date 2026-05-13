import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export abstract class Form<T> extends Component<T> {
  protected form: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  protected constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.form = container;
    this.submitButton = container.querySelector(
      "button[type='submit']",
    ) as HTMLButtonElement;
    this.errorsElement = container.querySelector(
      ".form__errors",
    ) as HTMLElement;

    this.form.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.events.emit("form:input", {
        field: target.name,
        value: target.value,
      });
    });

    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      this.events.emit("form:submit", { form: this.form.name });
    });
  }

  setValid(isValid: boolean): void {
    this.submitButton.disabled = !isValid;
  }

  setErrors(text: string): void {
    this.errorsElement.textContent = text;
  }

  clear(): void {
    this.form.reset();
  }
}

