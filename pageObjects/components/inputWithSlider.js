import { Input } from "./Input.js";
import { Slider } from "./Slider.js";
import { SliderSteps } from "./SliderSteps.js";
export default class InputWithSlider {
  constructor(input, slider, sliderSteps, page) {
    this.input = new Input(input);
    this.slider = new Slider(slider, page);
    this.sliderSteps = new SliderSteps(sliderSteps);
  }

  async setSliderValue(value) {
    const percentageValue =
      await this.sliderSteps.calculateSliderPercentageFromValue(
        parseFloat(value),
      );
    await this.slider.changeSlider(percentageValue);
  }
}
