import { EyeDropperIcon } from "./icons/EyeDropperIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { MinusIcon } from "./icons/MinusIcon";
import { createButtonElement, createDivElement } from "../helpers";

export class Menu {
  eyeDropperBtn!: HTMLButtonElement;
  zoomPlusBtn: HTMLButtonElement;
  zoomScaleValue: HTMLSpanElement;
  zoomMinusBtn: HTMLButtonElement;
  magnifierMinusBtn: HTMLButtonElement;
  magnifierSizeValue: HTMLSpanElement;
  magnifierPlusBtn: HTMLButtonElement;

  constructor(parentElement: HTMLElement) {
    const menuContainer = createDivElement("menu_container");
    const eyeDropperBtnContainer = this.createEyeDropperToggle();
    const zoomScaleUi = this.createEyeDropperControls("Zoom scale");
    const magnifierSizeUi = this.createEyeDropperControls("Magnifier Size");

    menuContainer.appendChild(eyeDropperBtnContainer);
    menuContainer.appendChild(zoomScaleUi.container);
    menuContainer.appendChild(magnifierSizeUi.container);
    parentElement.appendChild(menuContainer);

    this.zoomMinusBtn = zoomScaleUi.minusBtn;
    this.zoomScaleValue = zoomScaleUi.valueDisplay;
    this.zoomPlusBtn = zoomScaleUi.plusBtn;
    this.magnifierMinusBtn = magnifierSizeUi.minusBtn;
    this.magnifierSizeValue = magnifierSizeUi.valueDisplay;
    this.magnifierPlusBtn = magnifierSizeUi.plusBtn;
  }

  private createEyeDropperToggle() {
    const eyeDropperBtnContainer = createDivElement("eyedropper_btn-container");
    const { eyeDropperIcon } = new EyeDropperIcon();
    const eyeDropperBtn = createButtonElement("btn", eyeDropperIcon);
    eyeDropperBtnContainer.appendChild(eyeDropperBtn);
    this.eyeDropperBtn = eyeDropperBtn;
    return eyeDropperBtnContainer;
  }

  private createEyeDropperControls(titleText: string) {
    const container = createDivElement("controls-ui-container");
    const { plusIcon } = new PlusIcon();
    const { minusIcon } = new MinusIcon();
    const minusBtn = createButtonElement("btn", minusIcon);
    const plusBtn = createButtonElement("btn", plusIcon);
    const displayContainer = createDivElement("control-value-display");
    displayContainer.innerText = titleText;
    const valueDisplay = document.createElement("span");

    displayContainer.appendChild(valueDisplay);
    container.appendChild(minusBtn);
    container.appendChild(displayContainer);
    container.appendChild(plusBtn);

    return { container, minusBtn, plusBtn, valueDisplay };
  }

  public showZoomScale = (currentValue: number) => {
    this.zoomScaleValue.innerText = String(currentValue);
  };

  public hideZoomScale = () => {
    this.zoomScaleValue.innerText = "";
  };

  public showMagnifierSize = (currentValue: string) => {
    this.magnifierSizeValue.innerText = currentValue;
  };

  public hideMagnifierSize = () => {
    this.magnifierSizeValue.innerText = "";
  };
}
