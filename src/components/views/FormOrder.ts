import { Form, IForm } from "./Form";
import { IEvents } from "../base/Events";
import { TPayment } from "../../types";

export interface IFormOrder extends IForm {
  payment: TPayment;
  address: string;
}

export class FormOrder extends Form<IFormOrder> {
  protected paymentButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.paymentButtons = Array.from(container.querySelectorAll(".button_alt"));
    this.addressInput = container.querySelector(
      "input[name='address']",
    ) as HTMLInputElement;

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.events.emit("form:input", {
          field: "payment",
          value: button.name,
        });
      });
    });
  }

  set payment(value: TPayment) {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === value);
    });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
