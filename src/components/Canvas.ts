export class Canvas {
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
}

