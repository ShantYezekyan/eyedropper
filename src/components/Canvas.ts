export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;

  constructor(parentElement: HTMLElement) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const ctx = canvas.getContext("2d", {
      colorSpace: "srgb",
      willReadFrequently: true,
    })!;

    const image = new Image();
    image.src = "./beach.jpg";

    this.canvas = canvas;
    this.ctx = ctx;
    this.image = image;
    parentElement.appendChild(canvas);
  }

  public resizeCanvas = (
    zoomFactor: number,
    setBackgroundSize: (
      canvasWidth: number,
      canvasHeight: number,
      zoomFactor: number
    ) => void
  ) => {
    const viewportWidth = window.innerWidth;
    // 150 is subtracted to give some space below the canvas
    // so that the eyedropper text is visible
    const viewportHeight = window.innerHeight - 150;
    const imageAspectRatio = this.image.width / this.image.height;
    let canvasWidth = viewportWidth;
    let canvasHeight = viewportWidth / imageAspectRatio;

    if (canvasHeight > viewportHeight) {
      canvasHeight = viewportHeight;
      canvasWidth = viewportHeight * imageAspectRatio;
    }

    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    setBackgroundSize(canvasWidth, canvasHeight, zoomFactor);
  };
}
