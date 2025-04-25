export default class InputWithSlider {
  constructor(input, slider, sliderSteps, page) {
    this.input = input;
    this.slider = slider;
    this.sliderSteps = sliderSteps;
    this.page = page;
  }

  async setValue(value) {
    await this.input.fill(value);
  }

  async getValue() {
    return await this.input.textContent();
  }

  async calculateSliderPercentageFromValue(value) {
    const steps = await this.sliderSteps.locator(".marker").allTextContents();
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

  async setSliderValue(value) {
    const percentageValue = await this.calculateSliderPercentageFromValue(
      parseFloat(value),
    );
    await this.changeSlider(
      this.slider.locator(".ui-slider-handle"),
      this.slider,
      percentageValue,
    );
  }

  async changeSlider(thumb, slider, targetPercentage) {
    const thumbBoundingBox = await thumb.boundingBox();
    const sliderBoundingBox = await slider.boundingBox();

    const startPoint = {
      x: thumbBoundingBox.x + thumbBoundingBox.width / 2,
      y: thumbBoundingBox.y + thumbBoundingBox.height / 2,
    };

    const endPoint = {
      x: sliderBoundingBox.x + sliderBoundingBox.width * targetPercentage,
      y: thumbBoundingBox.y + thumbBoundingBox.height / 2,
    };

    await this.page.mouse.move(startPoint.x, startPoint.y);
    await this.page.mouse.down();
    await this.page.mouse.move(endPoint.x, endPoint.y);
    await this.page.mouse.up();
  }
}
