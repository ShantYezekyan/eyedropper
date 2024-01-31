export class EyeDropper {
  eyeDropper: HTMLDivElement;
  zoomFactor: number;

  constructor(parentElement: HTMLElement, zoomFactor: number = 2) {
    const eyeDropper = document.createElement("div");
    eyeDropper.setAttribute("class", "eyedropper");
    eyeDropper.style.display = 'none'

    const svgNS = "http://www.w3.org/2000/svg";
    const squareSVG = document.createElementNS(svgNS, "svg");
    squareSVG.setAttribute("class", "square-svg");
    squareSVG.setAttribute("width", "10px");
    squareSVG.setAttribute("height", "10px");
    squareSVG.setAttribute("viewBox", "0 0 330 330");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M315,0H15C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V15 C330,6.716,323.285,0,315,0z M300,300H30V30h270V300z"
    );
    path.setAttribute("fill", "#ffffff");
    squareSVG.appendChild(path);
    eyeDropper.appendChild(squareSVG);
    parentElement.appendChild(eyeDropper);

    this.eyeDropper = eyeDropper;
    this.zoomFactor = zoomFactor;
  }

  public updateEyeDropperPosition = (x: number, y: number) => {
    const halfWidth = this.eyeDropper.offsetWidth / 2;
    const halfHeight = this.eyeDropper.offsetHeight / 2;
    this.eyeDropper.style.left = `${x - halfWidth}px`;
    this.eyeDropper.style.top = `${y - halfHeight}px`;
    this.eyeDropper.style.backgroundPosition = `-${
      x * this.zoomFactor - this.eyeDropper.offsetWidth / 2
    }px -${y * this.zoomFactor - this.eyeDropper.offsetHeight / 2}px`;
  };

  public updateEyeDropperColor = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => {
    const { data } = ctx.getImageData(x, y, 1, 1);
    const rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    this.eyeDropper.style.borderColor = rgb;
  };

  public show = () => {
    this.eyeDropper.style.display = "flex";
  };

  public hide = () => {
    this.eyeDropper.style.display = "none";
  };
}
