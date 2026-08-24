import BaseComponent from "../baseComponent";

export class SliderSteps extends BaseComponent {
  constructor(component) {
    super(component);
    this.markers = this.component.locator(".marker");
  }

  async calculateSliderPercentageFromValue(value) {
    const steps = await this.getSteps();
    const stepValues = steps.map((step) =>
      parseFloat(step.replace("L", "00000")),
    );
    const minValue = Math.min(...stepValues);
    const maxValue = Math.max(...stepValues);
    const range = maxValue - minValue;
    const stepValue = value - minValue;
    const percentage = stepValue / range;
    return percentage;
  }

  async getSteps() {
    return await this.markers.allTextContents();
  }
}
