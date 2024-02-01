import { EyeDropperIcon } from "./icons/EyeDropperIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { MinusIcon } from "./icons/MinusIcon";
import { createButtonElement } from "../helpers";

export class Menu {
  eyeDropperBtn!: HTMLButtonElement;
  zoomPlusBtn: HTMLButtonElement;
  zoomTextDisplay: HTMLDivElement;
  zoomMinusBtn: HTMLButtonElement;
  magnifierMinusBtn: HTMLButtonElement;
  magnifierTextDisplay: HTMLDivElement;
  magnifierPlusBtn: HTMLButtonElement;

  constructor(parentElement: HTMLElement) {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("class", "menu_container");

    const eyeDropperBtnContainer = this.createEyeDropperToggle();
    const zoomScaleUi = this.createEyeDropperControls(
      "zoom_scale_ui-container",
      "zoom_scale-display",
      "Zoom scale"
    );
    const magnifierSizeUi = this.createEyeDropperControls(
      "magnifier_size_ui-container",
      "magnifier_size-display",
      "Magnifier Size"
    );

    menuContainer.appendChild(eyeDropperBtnContainer);
    menuContainer.appendChild(zoomScaleUi.container);
    menuContainer.appendChild(magnifierSizeUi.container);
    parentElement.appendChild(menuContainer);

    this.zoomMinusBtn = zoomScaleUi.minusBtn;
    this.zoomTextDisplay = zoomScaleUi.textDisplay;
    this.zoomPlusBtn = zoomScaleUi.plusBtn;
    this.magnifierMinusBtn = magnifierSizeUi.minusBtn;
    this.magnifierTextDisplay = magnifierSizeUi.textDisplay;
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

  private createEyeDropperControls(
    elementClass: string,
    displayClass: string,
    displayText: string
  ) {
    const container = document.createElement("div");
    container.setAttribute("class", elementClass);
    const { plusIcon } = new PlusIcon();
    const { minusIcon } = new MinusIcon();
    const minusBtn = createButtonElement("btn", minusIcon);
    const plusBtn = createButtonElement("btn", plusIcon);
    const textDisplay = document.createElement("div");
    textDisplay.setAttribute("class", displayClass);
    textDisplay.innerText = displayText;

    container.appendChild(minusBtn);
    container.appendChild(textDisplay);
    container.appendChild(plusBtn);

    return { container, minusBtn, plusBtn, textDisplay };
  }
}
