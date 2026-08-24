import BaseComponent from "../baseComponent";

export class Input extends BaseComponent {
  constructor(component) {
    super(component);
    this.input = this.component;
  }

  async setValue(value) {
    await this.input.fill(value);
  }

  async getValue() {
    return await this.input.textContent();
  }
}
