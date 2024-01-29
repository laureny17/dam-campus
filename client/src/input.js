import {
  fullMap,
  plate,
  walk_1,
  walk_2,
  buttonLocations,
  BACKGROUND_R,
  BACKGROUND_G,
  BACKGROUND_B,
  MITRED_R,
  MITRED_G,
  MITRED_B,
} from "./images-etc.js";

import { get, post } from "./utilities.js";

////////////////////////////////////
///      movement mechanics      ///
////////////////////////////////////

const moveBeaver = (context, beaverDir, mapPosition) => {
  // first, check if the beaver can move in that input dir
  // if there is a wall in front of him, we won't want him to move
  // slightly buggy for diagonals/corners!!!! fix later
  const nextX = context.canvas.width / 2 + beaverDir.x * 65;
  const nextY = context.canvas.height / 2 + beaverDir.y * 65;
  const pix = context.getImageData(nextX, nextY, 1, 1);
  if (pix.data[0] == BACKGROUND_R && pix.data[1] == BACKGROUND_G && pix.data[2] == BACKGROUND_B) {
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
  window.addEventListener("click", (event) => {
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
      console.log(buildingClicked);
      get("/api/whoami").then((user) => {
        if (user._id) {
          post("/api/update_position", { userid: user._id, x: mapPosition.x, y: mapPosition.y });
        }
      });
      // Redirect to the /feed page with buildingClicked as a query parameter
      window.location.href = `/feed/${buildingClicked}`;
    }
  });
};

export { moveBeaver, handleClick };
