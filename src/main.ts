import Canvas from "./components/Canvas";
import EyeDropper from "./components/EyeDropper";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const canvasContainer = document.createElement("div");
canvasContainer.setAttribute("class", "canvas-container");
app.appendChild(canvasContainer);

const canvasModule = new Canvas(canvasContainer);
const eyeDropperModule = new EyeDropper(canvasContainer);
const { canvas, ctx } = canvasModule;
const { eyeDropper, zoomFactor } = eyeDropperModule;

const { width, height } = canvasContainer.getBoundingClientRect();
canvas.width = width;
canvas.height = height;

const image = new Image();
image.src = "./beach.jpg";

image.onload = function () {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};
