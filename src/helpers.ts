export const rgbToHex = (r: number, g: number, b: number) => {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

export const getContrastYIQ = (r: number, g: number, b: number) => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

export const createButtonElement = (
  className: string,
  iconElement?: SVGElement
): HTMLButtonElement => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", className);
  if (iconElement) {
    buttonElement.appendChild(iconElement);
  }
  return buttonElement;
};

export const createDivElement = (
  className: string,
  innerText?: string
): HTMLDivElement => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", className);
  if (innerText) {
    divElement.innerText = innerText;
  }
  return divElement;
};
