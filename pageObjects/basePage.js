import TabNavigation from "./components/tabNavigation.js";
import InputWithSlider from "./components/inputWithSlider.js";
import PieChart from "./components/pieChart.js";
import BarChart from "./components/barChart.js";

export default class BasePage {
  constructor(page) {
    this.page = page;
    this.tabNavigation = new TabNavigation(
      this.page.locator(".loanproduct-nav"),
    );

    this.loanAmount = new InputWithSlider(
      page.locator("#loanamount"),
      page.locator("#loanamountslider"),
      page.locator("#loanamountsteps"),
      this.page,
    );
    this.interestRate = new InputWithSlider(
      page.locator("#loaninterest"),
      page.locator("#loaninterestslider"),
      page.locator("#loanintereststeps"),
      this.page,
    );
    this.loanTenure = new InputWithSlider(
      page.locator("#loanterm"),
      page.locator("#loantermslider"),
      page.locator("#loantermsteps"),
      this.page,
    );

    this.pieChart = new PieChart(this.page.locator("#emipiechart"));
    this.barChart = new BarChart(this.page.locator("#emibarchart"));
  }

  async goto(path = "/") {
    await this.page.goto(path);
    await this.clickConsentOnDataPopupIfAppears();
  }

  async clickConsentOnDataPopupIfAppears() {
    const manageData = this.page.locator("h1", {
      hasText: "This site asks for consent to use your data",
    });
    if ((await manageData.count()) === 0) {
      return;
    }

    const confirm = this.page.locator("button", { hasText: "Consent" });
    await confirm.click();
  }
}
