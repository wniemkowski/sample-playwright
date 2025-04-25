import BaseComponent from "../baseComponent.js";

export default class TabNavigation extends BaseComponent {
  async clickTab(tabName) {
    const tab = await this.component.locator(this.getTabId(tabName));
    if (tab) {
      await tab.click();
    } else {
      throw new Error(`Tab with name ${tabName} not found`);
    }
  }

  async getActiveTab() {
    const activeTab = await this.component.locator(".active");
    return activeTab ? await activeTab.innerText() : null;
  }

  getTabId(tabName) {
    switch (tabName) {
      case "Home Loan":
        return "#home-loan";
      case "Car Loan":
        return "#car-loan";
      case "Personal Loan":
        return "#personal-loan";
      default:
        throw new Error(`Tab with name ${tabName} not found`);
    }
  }
}
