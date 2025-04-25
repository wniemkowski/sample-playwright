import BaseComponent from "../baseComponent.js";

export default class PieChart extends BaseComponent {
  constructor(component) {
    super(component);
  }

  async getValues() {
    let results = {};

    let color1Data = await this.component
      .locator(".highcharts-data-label-color-0")
      .textContent();
    let color1Legend = await this.component
      .locator(".highcharts-legend .highcharts-color-0")
      .textContent();

    let color2Data = await this.component
      .locator(".highcharts-data-label-color-1")
      .textContent();
    let color2Legend = await this.component
      .locator(".highcharts-legend .highcharts-color-1")
      .textContent();

    results[color1Legend] = color1Data;
    results[color2Legend] = color2Data;

    return results;
  }
}
