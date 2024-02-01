export class SquareIcon {
  squareIcon: SVGElement;

  constructor() {
    const svgNS = "http://www.w3.org/2000/svg";
    const squareSVG = document.createElementNS(svgNS, "svg");
    squareSVG.setAttribute("class", "square-svg");
    squareSVG.setAttribute("width", "10px");
    squareSVG.setAttribute("height", "10px");
    squareSVG.setAttribute("viewBox", "0 0 330 330");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M315,0H15C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V15 C330,6.716,323.285,0,315,0z M300,300H30V30h270V300z"
    );
    path.setAttribute("fill", "#ffffff");

    squareSVG.appendChild(path);
    this.squareIcon = squareSVG;
  }
}
