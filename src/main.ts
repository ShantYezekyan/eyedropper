import { Canvas } from "./components/Canvas";
import { EyeDropper } from "./components/EyeDropper";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const toggleButton = document.createElement("button");
toggleButton.setAttribute("class", "toggle-btn");
toggleButton.textContent = "Toggle Eyedropper";
app.appendChild(toggleButton);

let eyeDropperIsActive = false;

const canvasContainer = document.createElement("div");
canvasContainer.setAttribute("class", "canvas-container");
app.appendChild(canvasContainer);

const canvasModule = new Canvas(canvasContainer);
const eyeDropperModule = new EyeDropper(canvasContainer, 4);
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

function handleMouseMove(e: MouseEvent) {
  const { x, y } = getMousePosition(canvas, e);
  eyeDropperModule.updateEyeDropperPosition(x, y);
  const { data } = ctx.getImageData(x, y, 1, 1);
  const rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  eyeDropper.style.borderColor = rgb;
}

function toggleEyeDropper() {
  eyeDropperIsActive = !eyeDropperIsActive;
  if (eyeDropperIsActive) {
    canvas.style.cursor = "none";
    canvas.addEventListener("mouseenter", eyeDropperModule.show);
    canvas.addEventListener("mouseleave", eyeDropperModule.hide);
    canvas.addEventListener("mousemove", handleMouseMove);
  } else {
    canvas.style.cursor = "default";
    canvas.removeEventListener("mouseenter", eyeDropperModule.show);
    canvas.removeEventListener("mouseleave", eyeDropperModule.hide);
    canvas.removeEventListener("mousemove", handleMouseMove);
  }
}

toggleButton.addEventListener("click", toggleEyeDropper);
