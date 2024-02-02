export class PlusIcon {
  plusIcon: SVGElement;

  constructor() {
    const svgNS = "http://www.w3.org/2000/svg";
    const plusSVG = document.createElementNS(svgNS, "svg");
    plusSVG.setAttribute("width", "16px");
    plusSVG.setAttribute("height", "16px");
    plusSVG.setAttribute("viewBox", "0 0 16 16");

    const horizontalLine = document.createElementNS(svgNS, "rect");
    horizontalLine.setAttribute("x", "2");
    horizontalLine.setAttribute("y", "7");
    horizontalLine.setAttribute("width", "12");
    horizontalLine.setAttribute("height", "2");
    horizontalLine.setAttribute("fill", "black");

    const verticalLine = document.createElementNS(svgNS, "rect");
    verticalLine.setAttribute("x", "7");
    verticalLine.setAttribute("y", "2");
    verticalLine.setAttribute("width", "2");
    verticalLine.setAttribute("height", "12");
    verticalLine.setAttribute("fill", "black");

    plusSVG.appendChild(horizontalLine);
    plusSVG.appendChild(verticalLine);
    this.plusIcon = plusSVG;
  }
}
