import BaseComponent from "../baseComponent.js";

export default class TabNavigation extends BaseComponent {
  constructor(component) {
    super(component);
    this.tabs = {
      "Home Loan": this.component.locator("#home-loan"),
      "Car Loan": this.component.locator("#car-loan"),
      "Personal Loan": this.component.locator("#personal-loan"),
    };
  }

  async clickTab(tabName) {
    const tab = await this.tabs[tabName];
    if (tab) {
      await tab.click();
    } else {
      throw new Error(`Tab with name ${tabName} not found`);
    }
  }
}
