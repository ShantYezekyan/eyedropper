export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  
  constructor(parentElement: HTMLElement, imageUrl: string) {
    
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.image = new Image();

    parentElement.appendChild(this.canvas);
    this.image.src = imageUrl;

    this.image.onload = () => {
      this.adjustCanvasSize();
      this.drawImage();
    };

    window.addEventListener("resize", this.handleResize);
  }

  private adjustCanvasSize(): void {
    const aspectRatio = this.image.width / this.image.height;
    let newWidth = window.innerWidth;
    let newHeight = newWidth / aspectRatio;

    if (newHeight > window.innerHeight) {
      newHeight = window.innerHeight;
      newWidth = newHeight * aspectRatio;
    }

    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
  }

  private drawImage(): void {
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }

  private handleResize = (): void => {
    this.adjustCanvasSize();
    this.drawImage();
  };

  public destroy(): void {
    window.removeEventListener("resize", this.handleResize);
  }
}
