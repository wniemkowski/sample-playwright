import BasePage from "../basePage.js";

export default class personalLoan extends BasePage {
  constructor(page) {
    super(page);
    this.calendar = this.page.locator("#startmonthyear");
  }

  async goto() {
    await super.goto();
    await this.tabNavigation.clickTab("Personal Loan");
  }

  async setStartMonth(month) {
    await this.calendar.click();
    await this.page
      .locator(".datepicker")
      .locator("span", { hasText: month })
      .click();
  }
}
