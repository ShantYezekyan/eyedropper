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
let imageAspectRatio = 0;

image.onload = () => {
  imageAspectRatio = image.naturalWidth / image.naturalHeight;
  resizeCanvas();
  eyeDropper.style.backgroundImage = `url('${canvas.toDataURL()}')`;
};

function resizeCanvas() {
  const containerWidth = canvasContainer.clientWidth;
  const containerHeight = canvasContainer.clientHeight;

  // Calculate new canvas dimensions
  let newCanvasWidth, newCanvasHeight;
  if (containerWidth / containerHeight > imageAspectRatio) {
    newCanvasHeight = containerHeight;
    newCanvasWidth = newCanvasHeight * imageAspectRatio;
  } else {
    newCanvasWidth = containerWidth;
    newCanvasHeight = newCanvasWidth / imageAspectRatio;
  }

  canvas.width = newCanvasWidth;
  canvas.height = newCanvasHeight;
  ctx.drawImage(image, 0, 0, newCanvasWidth, newCanvasHeight);

  // Update eyedropper's background size
  eyeDropper.style.backgroundSize = `${newCanvasWidth * zoomFactor}px ${
    newCanvasHeight * zoomFactor
  }px`;
}

window.addEventListener("resize", resizeCanvas);

function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function handleMouseMove(e: MouseEvent) {
  const { x, y } = getMousePosition(canvas, e);
  eyeDropperModule.updateEyeDropperPosition(x, y);
  eyeDropperModule.updateEyeDropperColorData(ctx, x, y);
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
