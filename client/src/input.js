import {
  buttonLocations,
  BACKGROUND_R,
  BACKGROUND_G,
  BACKGROUND_B,
  MITRED_R,
  MITRED_G,
  MITRED_B,
} from "./images-etc.js";

import { get, post } from "./utilities.js";

const BEAVER_SIZE = 65;
const SQRT_2 = 1.41;

////////////////////////////////////
///      movement mechanics      ///
////////////////////////////////////

const moveBeaver = (context, beaverDir, mapPosition) => {
  // first, check if the beaver can move in that input dir
  // if there is a wall in front of him, we won't want him to move
  // slightly buggy for diagonals/corners!!!! fix later
  let next = { x: context.canvas.width / 2, y: context.canvas.height / 2 };
  let next1 = { x: context.canvas.width / 2, y: context.canvas.height / 2 };
  let next2 = { x: context.canvas.width / 2, y: context.canvas.height / 2 };

  // // check more collision points for better movement mechanics!
  if (beaverDir.x === 0 && (beaverDir.y === -1 || beaverDir.y === 1)) {
    // angle = 0 or 180;
    // next.x keep
    next.y += beaverDir.y * BEAVER_SIZE;
    next1.x += 15;
    next1.y += beaverDir.y * BEAVER_SIZE;
    next2.x -= 15;
    next2.y += beaverDir.y * BEAVER_SIZE;
  } else if (
    (beaverDir.x === 1 && beaverDir.y === -1) ||
    (beaverDir.x === -1 && beaverDir.y === 1)
  ) {
    // angle = 45; or 225
    next.x += (beaverDir.x * BEAVER_SIZE) / SQRT_2;
    next.y += (beaverDir.y * BEAVER_SIZE) / SQRT_2;
    next1.x += (beaverDir.x * BEAVER_SIZE) / SQRT_2;
    next1.y += (beaverDir.y * BEAVER_SIZE) / SQRT_2 + 15 / (SQRT_2 - 0.2);
    next2.x += (beaverDir.x * BEAVER_SIZE) / SQRT_2 - 15 / (SQRT_2 - 0.2);
    next2.y += (beaverDir.y * BEAVER_SIZE) / SQRT_2;
  } else if ((beaverDir.x === 1 || beaverDir.x === -1) && beaverDir.y === 0) {
    // angle = 90 or 270;
    // next.y keep
    next.x += beaverDir.x * BEAVER_SIZE;
    next1.x += beaverDir.x * BEAVER_SIZE;
    next1.y += 15;
    next2.x += beaverDir.x * BEAVER_SIZE;
    next2.y -= 15;
  } else if (
    (beaverDir.x === 1 && beaverDir.y === 1) ||
    (beaverDir.x === -1 && beaverDir.y === -1)
  ) {
    // angle = 135; or 315
    next.x += (beaverDir.x * BEAVER_SIZE) / SQRT_2;
    next.y += (beaverDir.y * BEAVER_SIZE) / SQRT_2;
    next1.x += (beaverDir.x * BEAVER_SIZE) / SQRT_2;
    next1.y += (beaverDir.y * BEAVER_SIZE) / SQRT_2 - 15 / (SQRT_2 - 0.2);
    next2.x += (beaverDir.x * BEAVER_SIZE) / SQRT_2 - 15 / (SQRT_2 - 0.2);
    next2.y += (beaverDir.y * BEAVER_SIZE) / SQRT_2;
  }

  const pix = context.getImageData(next.x, next.y, 1, 1);
  const pix1 = context.getImageData(next1.x, next1.y, 1, 1);
  const pix2 = context.getImageData(next2.x, next2.y, 1, 1);

  const toCheckR = [pix.data[0], pix1.data[0], pix2.data[0]];
  const toCheckG = [pix.data[1], pix1.data[1], pix2.data[1]];
  const toCheckB = [pix.data[2], pix1.data[2], pix2.data[2]];

  let canMove = true;

  for (var R1 of toCheckR) {
    if (R1 !== 255 && R1 !== MITRED_R) {
      canMove = false;
    }
  }
  for (var G1 of toCheckG) {
    if (G1 !== 255 && G1 !== MITRED_G) {
      canMove = false;
    }
  }
  for (var B1 of toCheckB) {
    if (B1 !== 255 && B1 !== MITRED_B) {
      canMove = false;
    }
  }

  if (!canMove) {
    // console.log("wall"); // testing
    mapPosition.y += beaverDir.y * 2;
    mapPosition.x += beaverDir.x * 2;
  }
  // else, user can move in desired direction
  else {
    // give multiplier for speed
    if (beaverDir.x === 0 && beaverDir.y !== 0) {
      mapPosition.y -= beaverDir.y * 3;
    } else if (beaverDir.y === 0 && beaverDir.x !== 0) {
      mapPosition.x -= beaverDir.x * 3;
    }
    // if moving diagonally, use diff speed multiplier so it's not extra fast
    else if (beaverDir.x !== 0 && beaverDir.y !== 0) {
      mapPosition.y -= beaverDir.y * 2;
      mapPosition.x -= beaverDir.x * 2;
    }
  }
};

////////////////////////////////////
///        on clicked color      ///
////////////////////////////////////

const handleClick = (context, mapPosition) => {
  let buildingClicked;
  // let rect = canvas.getBoundingClientRect();
  // let xcoord = event.clientX - rect.left;
  // let ycoord = event.clientY - rect.top;
  let xcoord = event.clientX;
  let ycoord = event.clientY;
  let pixel = context.getImageData(xcoord, ycoord, 1, 1);
  // console.log(xcoord + ", " + ycoord); // for testing
  // console.log(pixel.data[0] + ", " + pixel.data[1] + ", " + pixel.data[2]); // for testing
  if (pixel.data[0] === MITRED_R && pixel.data[1] === MITRED_G && pixel.data[2] === MITRED_B) {
    let clickedX = mapPosition.x - xcoord;
    let clickedY = mapPosition.y - ycoord;
    // console.log(clickedX + ", " + clickedY);
    // let buildingClicked;
    for (var key in buttonLocations) {
      if (
        clickedX <= buttonLocations[key][0] + 25 &&
        clickedX >= buttonLocations[key][0] - 25 &&
        clickedY <= buttonLocations[key][1] + 25 &&
        clickedY >= buttonLocations[key][1] - 25
      ) {
        buildingClicked = key;
        break;
      }
    }
    if (buildingClicked) {
      localStorage.setItem("mapPosition", JSON.stringify(mapPosition));
      window.open(`/feed/${buildingClicked}`);
    }
  }
};

export { moveBeaver, handleClick };
