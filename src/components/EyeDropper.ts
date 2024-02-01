import { getContrastYIQ, rgbToHex } from "../helpers";
import { SquareIcon } from "./icons/SquareIcon";

export class EyeDropper {
  eyeDropper: HTMLDivElement;
  zoomFactor: number;
  hexTextDisplay: HTMLDivElement;

  constructor(parentElement: HTMLElement, zoomFactor: number = 2) {
    const eyeDropper = document.createElement("div");
    eyeDropper.setAttribute("class", "eyedropper");
    eyeDropper.style.display = "none";

    const hexTextDisplay = document.createElement("div");
    hexTextDisplay.setAttribute("class", "hex-text-display");

    const { squareIcon } = new SquareIcon();

    eyeDropper.appendChild(squareIcon);
    eyeDropper.appendChild(hexTextDisplay);
    parentElement.appendChild(eyeDropper);

    this.hexTextDisplay = hexTextDisplay;
    this.eyeDropper = eyeDropper;
    this.zoomFactor = zoomFactor;
  }

  public updateEyeDropperPosition = (x: number, y: number) => {
    const borderWidth = 10;
    const halfWidth = this.eyeDropper.offsetWidth / 2;
    const halfHeight = this.eyeDropper.offsetHeight / 2;
    this.eyeDropper.style.left = `${x - halfWidth}px`;
    this.eyeDropper.style.top = `${y - halfHeight}px`;
    this.eyeDropper.style.backgroundPosition = `-${
      x * this.zoomFactor - this.eyeDropper.offsetWidth / 2 + borderWidth
    }px -${
      y * this.zoomFactor - this.eyeDropper.offsetHeight / 2 + borderWidth
    }px`;
  };

  public updateEyeDropperColorData = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => {
    const { data } = ctx.getImageData(x, y, 1, 1);
    const hex = rgbToHex(data[0], data[1], data[2]);
    const contrast = getContrastYIQ(data[0], data[1], data[2]);
    this.eyeDropper.style.borderColor = hex;
    this.eyeDropper.style.outlineColor = contrast;
    this.hexTextDisplay.style.backgroundColor = hex;
    this.hexTextDisplay.style.color = contrast;
    this.hexTextDisplay.innerText = hex;
  };

  public show = () => {
    this.eyeDropper.style.display = "flex";
  };

  public hide = () => {
    this.eyeDropper.style.display = "none";
  };
}
