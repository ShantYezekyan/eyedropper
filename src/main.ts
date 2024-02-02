import { Canvas } from "./components/Canvas";
import { EyeDropper } from "./components/EyeDropper";
import { Menu } from "./components/Menu";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const MenuModule = new Menu(app);
const {
  eyeDropperBtn,
  magnifierMinusBtn,
  magnifierPlusBtn,
  magnifierSizeValue,
  zoomMinusBtn,
  zoomPlusBtn,
  zoomScaleValue,
} = MenuModule;

let eyeDropperIsActive = false;

const canvasContainer = document.createElement("div");
canvasContainer.setAttribute("class", "canvas_container");
app.appendChild(canvasContainer);

const canvasModule = new Canvas(canvasContainer);
const eyeDropperModule = new EyeDropper(canvasContainer);
const { canvas, ctx } = canvasModule;
const { eyeDropper, zoomFactor } = eyeDropperModule;

const image = new Image();
image.src = "./beach.jpg";

image.onload = () => {
  resizeCanvas();
  eyeDropper.style.backgroundImage = `url('${canvas.toDataURL("image/jpeg")}')`;
};

function resizeCanvas() {
  const viewportWidth = window.innerWidth;
  // 150 is subtracted to give some space below the canvas
  // so that the eyedropper text is visible
  const viewportHeight = window.innerHeight - 150;
  const imageAspectRatio = image.width / image.height;
  let canvasWidth = viewportWidth;
  let canvasHeight = viewportWidth / imageAspectRatio;

  if (canvasHeight > viewportHeight) {
    canvasHeight = viewportHeight;
    canvasWidth = viewportHeight * imageAspectRatio;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  eyeDropperModule.setBackgroundSize(canvasWidth, canvasHeight, zoomFactor);
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

function handleDecreaseMagnifierSize() {
  const result = eyeDropperModule.decreaseMagnifierSize();
  magnifierSizeValue.innerText = result;
}

function handleIncreaseMagnifierSize() {
  const result = eyeDropperModule.increaseMagnifierSize();
  magnifierSizeValue.innerText = result;
}

function handleDecreaseZoomScale() {
  const result = eyeDropperModule.decreaseZoomScale();
  eyeDropperModule.setBackgroundSize(canvas.width, canvas.height, result);
  zoomScaleValue.innerText = String(result);
}

function handleIncreaseZoomScale() {
  const result = eyeDropperModule.increaseZoomScale();
  eyeDropperModule.setBackgroundSize(canvas.width, canvas.height, result);
  zoomScaleValue.innerText = String(result);
}

function toggleEyeDropper() {
  eyeDropperIsActive = !eyeDropperIsActive;
  if (eyeDropperIsActive) {
    canvas.style.cursor = "none";
    const result = eyeDropperModule.getMagnifierCurrentSize();
    MenuModule.showMagnifierSize(result);
    MenuModule.showZoomScale(zoomFactor);
    canvas.addEventListener("mouseenter", eyeDropperModule.show);
    canvas.addEventListener("mouseleave", eyeDropperModule.hide);
    canvas.addEventListener("mousemove", handleMouseMove);
    magnifierMinusBtn.addEventListener("click", handleDecreaseMagnifierSize);
    magnifierPlusBtn.addEventListener("click", handleIncreaseMagnifierSize);
    zoomMinusBtn.addEventListener("click", handleDecreaseZoomScale);
    zoomPlusBtn.addEventListener("click", handleIncreaseZoomScale);
  } else {
    canvas.style.cursor = "default";
    MenuModule.hideMagnifierSize();
    canvas.removeEventListener("mouseenter", eyeDropperModule.show);
    canvas.removeEventListener("mouseleave", eyeDropperModule.hide);
    canvas.removeEventListener("mousemove", handleMouseMove);
    magnifierMinusBtn.removeEventListener("click", handleDecreaseMagnifierSize);
    magnifierPlusBtn.removeEventListener("click", handleIncreaseMagnifierSize);
    zoomMinusBtn.removeEventListener("click", handleDecreaseZoomScale);
    zoomPlusBtn.removeEventListener("click", handleIncreaseZoomScale);
  }
}

eyeDropperBtn.addEventListener("click", toggleEyeDropper);
window.addEventListener("resize", resizeCanvas);
