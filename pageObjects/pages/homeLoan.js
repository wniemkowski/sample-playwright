import BasePage from "../basePage.js";

export default class HomeLoan extends BasePage {
  constructor(page) {
    super(page);
  }

  async goto() {
    await super.goto();
    await this.tabNavigation.clickTab("Home Loan");
  }
}
