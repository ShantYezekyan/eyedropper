export default class EyeDropper {
  eyeDropper: HTMLDivElement;
  zoomFactor: number;

  constructor(parentElement: HTMLElement, zoomFactor: number = 2) {
    const eyeDropper = document.createElement("div");
    eyeDropper.setAttribute("class", "eyedropper");

    this.eyeDropper = eyeDropper;
    this.zoomFactor = zoomFactor;
    parentElement.appendChild(this.eyeDropper);
  }
}
