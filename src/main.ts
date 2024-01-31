import { Canvas } from "./components/Canvas";
import { EyeDropper } from "./components/EyeDropper";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const canvasContainer = document.createElement("div");
canvasContainer.setAttribute("class", "canvas-container");
app.appendChild(canvasContainer);

const canvasModule = new Canvas(canvasContainer);
const eyeDropperModule = new EyeDropper(canvasContainer);
const { canvas, ctx } = canvasModule;
const { eyeDropper, zoomFactor } = eyeDropperModule;

const image = new Image();
image.src = "./beach.jpg";
const { width, height } = canvasContainer.getBoundingClientRect();
canvas.width = width;
canvas.height = height;

image.onload = () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  eyeDropper.style.backgroundImage = `url('${canvas.toDataURL()}')`;
  eyeDropper.style.backgroundSize = `${canvas.width * zoomFactor}px ${
    canvas.height * zoomFactor
  }px`;
};

function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left - window.scrollX,
    y: e.clientY - rect.top - window.scrollY,
  };
}

canvas.addEventListener("mousemove", (e) => {
  const { x, y } = getMousePosition(canvas, e);
  eyeDropperModule.updateEyeDropperPosition(x, y);
});

canvas.addEventListener("mouseenter", () => eyeDropperModule.show());
canvas.addEventListener("mouseleave", () => eyeDropperModule.hide());
