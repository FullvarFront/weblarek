import { Component } from "../base/Component";

export class Gallery<T> extends Component<T> {
  constructor(container: HTMLElement) {
    super(container);
  }

  setCatalog(items: HTMLElement[]): void {
    this.container.replaceChildren(...items);
  }
}
