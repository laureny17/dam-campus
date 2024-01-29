import { fullMap, plate, walk_1, walk_2, buttonLocations } from "./images-etc.js";
import { getBeaverAngle } from "./movement-logic.js";

////////////////////////////////////
///  draw background and plates  ///
////////////////////////////////////

const drawMap = (context, mapPosition) => {
  const currXPos = -4000 + mapPosition.x;
  const currYPos = -6000 + mapPosition.y;

  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // erase every time for animation
  context.drawImage(fullMap, currXPos, currYPos);

  function bgLoaded() {
    let colorUnderneath = context.getImageData(
      context.canvas.width / 2,
      context.canvas.height / 2,
      1,
      1
    );
    if (
      colorUnderneath.data[0] !== 255 &&
      colorUnderneath.data[1] !== 255 &&
      colorUnderneath.data[2] !== 255
    ) {
      return true;
    }
  }

  if (bgLoaded === false) {
    context.drawImage(fullMap, currXPos, currYPos);
    window.setTimeout(bgLoaded, 100);
  }

  let currButtonXPos;
  let currButtonYPos;

  Object.keys(buttonLocations).forEach((key) => {
    if (
      buttonLocations[key][0] <= mapPosition.x + 25 &&
      buttonLocations[key][0] >= mapPosition.x - context.canvas.width - 25 &&
      buttonLocations[key][1] <= mapPosition.y + 25 &&
      buttonLocations[key][1] >= mapPosition.y - context.canvas.height - 25
    ) {
      currButtonXPos = mapPosition.x - buttonLocations[key][0];
      currButtonYPos = mapPosition.y - buttonLocations[key][1];
      context.fillStyle = "#750014";
      context.fillRect(currButtonXPos - 25, currButtonYPos - 25, 50, 50);
      // below: drawing the handrawn plates
      // context.rect(currButtonXPos - 25, currButtonYPos - 25, 50, 50);
      // context.drawImage(plate, currButtonXPos - 25, currButtonYPos - 25, 50, 50);
      // console.log(key);
    }
  });
};

////////////////////////////////////
///        draw the beaver       ///
////////////////////////////////////

const drawBeaver = (context, walkFrame) => {
  let beaverImg;
  // walk frame 1
  if (walkFrame === 1) {
    beaverImg = walk_1["cool_blank"];
  }
  // else, walk frame 2
  else {
    beaverImg = walk_2["cool_blank"];
  }
  const angle = (getBeaverAngle() / 180) * Math.PI;

  // // find color underneath beaver
  // const colorUnderneath = context.getImageData(
  //   context.canvas.width / 2,
  //   context.canvas.height / 2,
  //   1,
  //   1
  // );
  // // if color underneath is beige, it means the map hasn't loaded in yet
  // if (
  //   colorUnderneath.data[0] === BACKGROUND_R &&
  //   colorUnderneath.data[1] === BACKGROUND_G &&
  //   colorUnderneath.data[2] === BACKGROUND_B
  // ) {
  //   window.setTimeout(50);
  // }

  // draw beaver on top of map, rotated at desired angle:

  context.save();
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
  context.rotate(angle);
  context.drawImage(
    beaverImg,
    148, // left cut
    22, // top cut
    200, // width of cut
    456, // height of cut
    // place beaver in center of screen?
    -25,
    -57,
    50,
    114
  );
  context.rotate(-angle);
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
  context.restore();
  // console.log("beaver drawn");
};

export { drawMap, drawBeaver };
