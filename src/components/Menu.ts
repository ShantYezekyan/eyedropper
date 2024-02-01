import { EyeDropperIcon } from "./icons/EyeDropperIcon";
export class Menu {
  eyeDropperBtn: HTMLButtonElement;

  constructor(parentElement: HTMLElement) {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("class", "menu-container");

    const eyeDropperBtn = document.createElement("button");
    eyeDropperBtn.setAttribute("class", "toggle-btn");

    const { eyeDropperIcon } = new EyeDropperIcon();

    eyeDropperBtn.appendChild(eyeDropperIcon);
    menuContainer.appendChild(eyeDropperBtn);
    parentElement.appendChild(menuContainer);
    this.eyeDropperBtn = eyeDropperBtn;
  }
}
