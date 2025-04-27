import BaseComponent from "../baseComponent.js";

export default class PieChart extends BaseComponent {
  constructor(component) {
    super(component);
    this.slices = (sliceIndex) => {
      return {
        slice: this.component.locator(
          `.highcharts-data-label-color-${sliceIndex}`,
        ),
        legend: this.component.locator(
          `.highcharts-legend .highcharts-color-${sliceIndex}`,
        ),
      };
    };
  }

  async getValues() {
    let results = {};

    let color1Data = await this.slices(0).slice.textContent();
    let color1Legend = await this.slices(0).legend.textContent();

    let color2Data = await this.slices(1).slice.textContent();
    let color2Legend = await this.slices(1).legend.textContent();

    results[color1Legend] = color1Data;
    results[color2Legend] = color2Data;

    return results;
  }
}
