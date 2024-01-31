export class EyeDropper {
  eyeDropper: HTMLDivElement;
  zoomFactor: number;

  constructor(parentElement: HTMLElement, zoomFactor: number = 2) {
    const eyeDropper = document.createElement("div");
    eyeDropper.setAttribute("class", "eyedropper");
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
    this.eyeDropper.style.display = "block";
  }

  public hide = () => {
    this.eyeDropper.style.display = "none";
  }
}
