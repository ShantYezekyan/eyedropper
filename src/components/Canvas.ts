export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(parentElement: HTMLElement) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const ctx = canvas.getContext("2d", { colorSpace: "srgb" })!;

    this.canvas = canvas;
    this.ctx = ctx;
    parentElement.appendChild(canvas);
  }

  // private adjustCanvasSize(): void {
  //   const aspectRatio = this.image.width / this.image.height;
  //   let newWidth = window.innerWidth;
  //   let newHeight = newWidth / aspectRatio;

  //   if (newHeight > window.innerHeight) {
  //     newHeight = window.innerHeight;
  //     newWidth = newHeight * aspectRatio;
  //   }

  //   this.canvas.width = newWidth;
  //   this.canvas.height = newHeight;
  // }

  // private drawImage(): void {
  //   this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  // }

  // private handleResize = (): void => {
  //   this.adjustCanvasSize();
  //   this.drawImage();
  // };

  // public destroy(): void {
  //   window.removeEventListener("resize", this.handleResize);
  // }
}
