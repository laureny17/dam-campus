import { updateCoordinates } from "./map-setup.js";
import { getInputDirection, getBeaverAngle, walkFrame } from "./movement-logic.js";
import { drawMap, drawBeaver } from "./draw.js";
import { moveBeaver, handleClick } from "./input.js";

let canvas;

let d = new Date();
let timePrev = d.getTime();

////////////////////////////////////
/// map setup & window logistics ///
////////////////////////////////////

let xPos = 2600;
let yPos = 975;
let mapPosition = { x: xPos, y: yPos };

updateCoordinates(xPos, yPos, mapPosition);

// initial position of map (positive x left, positive y up)
// = initial position of beaver... with (0, 0) was bottom right and (4000, 6000) as top left
// let mapPosition = { x: xPos, y: yPos };

let currWidth = window.innerWidth;
let currHeight = window.innerHeight;

// width and height of dimensions that the starting lobby 7 mapPosition was hardcoded to
const defaultWidth = 1470;
const desiredHeight = 800;
// to make sure refreshing doesn't change spawn point
mapPosition.x -= (defaultWidth - currWidth) / 2;
mapPosition.y -= (desiredHeight - currHeight) / 2;

// when window is resized, move map position accordingly so that the beaver stays in the same spot
let changeInWidth;
let changeInHeight;
window.addEventListener("resize", () => {
  changeInWidth = window.innerWidth - currWidth;
  changeInHeight = window.innerHeight - currHeight;
  currWidth = window.innerWidth;
  currHeight = window.innerHeight;
  mapPosition.x += changeInWidth / 2;
  mapPosition.y += changeInHeight / 2;
});

export const draw = (countFrame, canvasRef) => {
  canvas = canvasRef.current;
  if (!canvas) {
    return;
  }
  const context = canvas.getContext("2d", { willReadFrequently: true });

  const beaverDir = getInputDirection();
  moveBeaver(context, beaverDir, mapPosition);

  drawMap(context, mapPosition);
  drawBeaver(context, walkFrame);

  let dNow = new Date();
  let timeNow = dNow.getTime();

  // for when button is clicked
  if (timeNow - timePrev >= 500) {
    // ^^ prevents duplicate event listeners
    window.addEventListener(
      "click",
      (event) => {
        handleClick(context, mapPosition);
        window.removeEventListener("click", handleClick);
      },
      { once: true }
    );
    timePrev = timeNow;
  }
};
