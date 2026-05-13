import { Form, IForm } from "./Form";
import { IEvents } from "../base/Events";

export type IFormContacts = IForm;

export class FormContacts extends Form<IFormContacts> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }
}
