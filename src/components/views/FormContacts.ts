import { Form } from "./Form";
import { IEvents } from "../base/Events";

export class FormContacts<T> extends Form<T> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }
}
