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

const canvasModule = new Canvas(app);
const { canvasContainer, canvas, ctx, image } = canvasModule;
const eyeDropperModule = new EyeDropper(canvasContainer);
const { eyeDropper } = eyeDropperModule;

image.onload = () => {
  handleCanvasResize();
  eyeDropper.style.backgroundImage = `url('${canvas.toDataURL("image/jpeg")}')`;
};

function handleCanvasResize() {
  canvasModule.resizeCanvas(
    eyeDropperModule.zoomScale,
    eyeDropperModule.setBackgroundSize
  );
}

function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
  const rect = canvasModule.canvasRect;
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

function handleEyeDropperClick() {
  eyeDropperModule.toggleEyeDropper();
  if (eyeDropperModule.isActive) {
    canvas.style.cursor = "none";
    const result = eyeDropperModule.getMagnifierCurrentSize();
    MenuModule.showMagnifierSize(result);
    MenuModule.showZoomScale(eyeDropperModule.zoomScale);
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
    MenuModule.hideZoomScale();
    canvas.removeEventListener("mouseenter", eyeDropperModule.show);
    canvas.removeEventListener("mouseleave", eyeDropperModule.hide);
    canvas.removeEventListener("mousemove", handleMouseMove);
    magnifierMinusBtn.removeEventListener("click", handleDecreaseMagnifierSize);
    magnifierPlusBtn.removeEventListener("click", handleIncreaseMagnifierSize);
    zoomMinusBtn.removeEventListener("click", handleDecreaseZoomScale);
    zoomPlusBtn.removeEventListener("click", handleIncreaseZoomScale);
  }
}

eyeDropperBtn.addEventListener("click", handleEyeDropperClick);
window.addEventListener("resize", handleCanvasResize);
