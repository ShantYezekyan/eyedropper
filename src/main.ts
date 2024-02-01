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
  // Calculate device pixel ratio (necessary for high dpi screens, 1 is standard)
  const dpr = window.devicePixelRatio || 1;
  const containerWidth = canvasContainer.clientWidth;

  const buttonHeight =
    toggleButton.offsetHeight +
    parseFloat(window.getComputedStyle(toggleButton).marginTop) +
    parseFloat(window.getComputedStyle(toggleButton).marginBottom);
  const availableHeight = window.innerHeight - buttonHeight;

  // Calculate new canvas dimensions preserving the aspect ratio
  let newCanvasHeight = availableHeight,
    newCanvasWidth = newCanvasHeight * imageAspectRatio;
  if (newCanvasWidth > containerWidth) {
    newCanvasWidth = containerWidth;
    newCanvasHeight = newCanvasWidth / imageAspectRatio;
  }

  // Adjust canvas element size for high resolution
  canvas.width = newCanvasWidth * dpr;
  canvas.height = newCanvasHeight * dpr;

  // Reset transformations and clear canvas
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update canvas display size
  canvas.style.width = `${newCanvasWidth}px`;
  canvas.style.height = `${newCanvasHeight}px`;

  ctx.drawImage(image, 0, 0, newCanvasWidth, newCanvasHeight);
  eyeDropper.style.backgroundSize = `${newCanvasWidth * zoomFactor}px ${
    newCanvasHeight * zoomFactor
  }px`;
}

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
window.addEventListener("resize", resizeCanvas);
