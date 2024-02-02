import { EyeDropperIcon } from "./icons/EyeDropperIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { MinusIcon } from "./icons/MinusIcon";
import { createButtonElement } from "../helpers";

export class Menu {
  eyeDropperBtn!: HTMLButtonElement;
  zoomPlusBtn: HTMLButtonElement;
  zoomScaleValue: HTMLSpanElement;
  zoomMinusBtn: HTMLButtonElement;
  magnifierMinusBtn: HTMLButtonElement;
  magnifierSizeValue: HTMLSpanElement;
  magnifierPlusBtn: HTMLButtonElement;

  constructor(parentElement: HTMLElement) {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("class", "menu_container");

    const eyeDropperBtnContainer = this.createEyeDropperToggle();
    const zoomScaleUi = this.createEyeDropperControls(
      "zoom_scale_ui-container",
      "Zoom scale"
    );
    const magnifierSizeUi = this.createEyeDropperControls(
      "magnifier_size_ui-container",
      "Magnifier Size"
    );

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
    const eyeDropperBtnContainer = document.createElement("div");
    eyeDropperBtnContainer.setAttribute("class", "eyedropper_btn-container");
    const { eyeDropperIcon } = new EyeDropperIcon();
    const eyeDropperBtn = createButtonElement("btn", eyeDropperIcon);
    eyeDropperBtnContainer.appendChild(eyeDropperBtn);
    this.eyeDropperBtn = eyeDropperBtn;
    return eyeDropperBtnContainer;
  }

  private createEyeDropperControls(elementClass: string, titleText: string) {
    const container = document.createElement("div");
    container.setAttribute("class", elementClass);
    const { plusIcon } = new PlusIcon();
    const { minusIcon } = new MinusIcon();
    const minusBtn = createButtonElement("btn", minusIcon);
    const plusBtn = createButtonElement("btn", plusIcon);
    const displayContainer = document.createElement("div");
    displayContainer.setAttribute("class", "control-value-display");
    displayContainer.innerText = titleText;
    const valueDisplay = document.createElement("span");

    displayContainer.appendChild(valueDisplay);
    container.appendChild(minusBtn);
    container.appendChild(displayContainer);
    container.appendChild(plusBtn);

    return { container, minusBtn, plusBtn, valueDisplay };
  }

  public showMagnifierSize = (currentValue: string) => {
    this.magnifierSizeValue.innerText = currentValue;
  };

  public hideMagnifierSize = () => {
    this.magnifierSizeValue.innerText = "";
  };
}
