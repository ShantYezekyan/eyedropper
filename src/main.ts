import Canvas from "./components/Canvas";
import EyeDropper from "./components/EyeDropper";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const { canvas, ctx, image} = new Canvas(app, './beach.jpg');
const {eyeDropper, zoomFactor} = new EyeDropper(app)