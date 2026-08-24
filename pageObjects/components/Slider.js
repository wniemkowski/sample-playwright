import BaseComponent from "../baseComponent";

export class Slider extends BaseComponent {
  constructor(component, page) {
    super(component);

    this.sliderHandle = this.component.locator(".ui-slider-handle");
    this.page = page;
  }

  async changeSlider(targetPercentage) {
    const thumbBoundingBox = await this.sliderHandle.boundingBox();
    const sliderBoundingBox = await this.component.boundingBox();

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
