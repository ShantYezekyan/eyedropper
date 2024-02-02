export class MinusIcon {
  minusIcon: SVGElement;
  constructor() {
    const svgNS = "http://www.w3.org/2000/svg";
    const minusSVG = document.createElementNS(svgNS, "svg");
    minusSVG.setAttribute("width", "16px");
    minusSVG.setAttribute("height", "16px");
    minusSVG.setAttribute("viewBox", "0 0 16 16");

    const horizontalLine = document.createElementNS(svgNS, "rect");
    horizontalLine.setAttribute("x", "2");
    horizontalLine.setAttribute("y", "7");
    horizontalLine.setAttribute("width", "12");
    horizontalLine.setAttribute("height", "2");
    horizontalLine.setAttribute("fill", "black");

    minusSVG.appendChild(horizontalLine);
    this.minusIcon = minusSVG;
  }
}
