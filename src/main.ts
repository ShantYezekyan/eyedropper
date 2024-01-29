import Canvas from "./components/Canvas";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const { canvas, ctx, image} = new Canvas(app, './beach.jpg');
