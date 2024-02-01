export class Menu {
  eyeDropperBtn: HTMLButtonElement;

  constructor(parentElement: HTMLElement) {
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("class", "menu-container");

    const eyeDropperBtn = document.createElement("button");
    eyeDropperBtn.setAttribute("class", "toggle-btn");
    eyeDropperBtn.textContent = "Toggle Eyedropper";
    menuContainer.appendChild(eyeDropperBtn);

    parentElement.appendChild(menuContainer);
    this.eyeDropperBtn = eyeDropperBtn;
  }
}
