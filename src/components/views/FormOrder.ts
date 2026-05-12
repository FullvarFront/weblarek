import { Form } from "./Form";
import { IEvents } from "../base/Events";
import { TPayment } from "../../types";

export class FormOrder<T> extends Form<T> {
  protected paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.paymentButtons = Array.from(container.querySelectorAll(".button_alt"));

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.events.emit("form:input", {
          field: "payment",
          value: button.name,
        });
      });
    });
  }

  setPayment(value: TPayment): void {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === value);
    });
  }
}
