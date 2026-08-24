import BaseComponent from "../baseComponent.js";

export default class BarChart extends BaseComponent {
  constructor(component) {
    super(component);
    this.bars = this.component.locator(".highcharts-series-1 rect");
    this.tooltip = this.component.locator(".highcharts-tooltip tspan");
  }

  async getTooltipValues(barIndex) {
    let results = {};

    await this.component.scrollIntoViewIfNeeded();
    await this.bars.nth(barIndex).hover();

    let tooltipText = await this.tooltip.allTextContents();
    for (let row of tooltipText) {
      let [key, value] = row.split(":");
      results[key.trim()] = value.trim();
    }

    return results;
  }

  async getBarCount() {
    // -1 for legend, probably can be fixed with better selector
    return (await this.bars.count()) - 1;
  }
}
