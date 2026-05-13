import { Form, IForm } from "./Form";
import { IEvents } from "../base/Events";

export interface IFormContacts extends IForm {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.emailInput = container.querySelector(
      "input[name='email']",
    ) as HTMLInputElement;
    this.phoneInput = container.querySelector(
      "input[name='phone']",
    ) as HTMLInputElement;
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
