let canvas;

const BACKGROUND_R = 215;
const BACKGROUND_G = 185;
const BACKGROUND_B = 165;

const MITRED_R = 117;
const MITRED_G = 0;
const MITRED_B = 20;

////////////////////////////////////
///            images            ///
////////////////////////////////////

const fullMap = new Image(4000, 6000);
fullMap.src = "../fullMap.png";

const plate = new Image(280, 280);
plate.src = "../stuff/plate.png";

let walk_1 = {
  cool_blank: null,
  cool_bow: null,
  cool_glasses: null,
  cool_sunglasses: null,
  warm_blank: null,
  warm_bow: null,
  warm_glasses: null,
  warm_sunglasses: null,
};
let walk_2 = {
  cool_blank: null,
  cool_bow: null,
  cool_glasses: null,
  cool_sunglasses: null,
  warm_blank: null,
  warm_bow: null,
  warm_glasses: null,
  warm_sunglasses: null,
};

// load each image
Object.keys(walk_1).forEach((key) => {
  walk_1[key] = new Image(500, 500);
  walk_1[key].src = `../beavers/${key}/${key}_walk1.png`; // Load sprites from beavers in dist
});
Object.keys(walk_2).forEach((key) => {
  walk_2[key] = new Image(500, 500);
  walk_2[key].src = `../beavers/${key}/${key}_walk2.png`; // Load sprites from beavers in dist
});

// coordinate locations of center of buttons on the full map
let buttonLocations = {
  1: [90, 1152],
  2: [90, 2451],
  3: [721, 1169],
  4: [714, 2453],
  5: [1269, 621],
  6: [902, 3030],
  7: [2308, 759],
  8: [1831, 3018],
  9: [2656, 745],
  10: [2085, 1807],
  11: [2144, 1136],
  12: [2573, 2669],
  13: [2460, 1259],
  14: [247, 3474],
  16: [2281, 3375],
  17: [3284, 844],
  18: [1259, 3740],
  24: [3006, 2110],
  26: [3283, 2871],
  31: [2891, 1314],
  32: [3481, 3906],
  33: [3103, 592],
  34: [3465, 2563],
  35: [3413, 300],
  36: [3830, 2825],
  37: [3512, 1332],
  38: [3677, 2100],
  39: [3407, 1918],
  56: [2297, 4026],
  57: [2829, 4026],
  66: [2206, 4778],
  68: [2858, 5432],
};

////////////////////////////////////
/// map setup & window logistics ///
////////////////////////////////////

// initial position of map (positive x left, positive y up)
// = initial position of beaver... with (0, 0) was bottom right and (4000, 6000) as top left
let mapPosition = { x: 2600, y: 975 };
let inputDirection = { x: 0, y: 0 }; // nothing should be moving when user first enters the game
let angle = 0; // intial angle beaver is pointing to
let count = 1; // count for setting up walkFrame
let walkFrame = 1; // initial frame of beaver walk

let currWidth = window.innerWidth;
let currHeight = window.innerHeight;

// width and height of dimensions that the starting lobby 7 mapPosition was hardcoded to
const defaultWidth = 1470;
const desiredHeight = 800;
// to make sure refreshing doesn't change spawn point
mapPosition.x -= (defaultWidth - currWidth) / 2;
mapPosition.y -= (desiredHeight - currHeight) / 2;

// when window is resized, move map position accordingly so that the beaver stays in the same spot
if (window.innerWidth !== 1440 && window.innerHeight !== 799) {
}
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

////////////////////////////////////
///        player movement       ///
////////////////////////////////////

// why is there a long delay in switching to frames upon pressing a new key(s)?
// ex: do a continual zigzag -> the frame won't switch at all :()
window.addEventListener("keydown", (event) => {
  // console.log("walk frame is " + walkFrame); // testing; there is a bug; fix later
  count = (count % 4) + 1; // cycle 1, 2, 3, 4
  walkFrame = Math.ceil(count / 2); // switch walk frame from 1 to 2 every 2 counts
  if (event.key === "ArrowUp" || event.key === "w") {
    inputDirection.y = -1;
  }
  if (event.key === "ArrowDown" || event.key === "s") {
    inputDirection.y = 1;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    inputDirection.x = 1;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    inputDirection.x = -1;
  }
});

// on release of key, stop movement
window.addEventListener("keyup", (event) => {
  if ((event.key === "ArrowUp" || event.key === "w") && inputDirection.y === -1) {
    inputDirection.y = 0;
  }
  if ((event.key === "ArrowDown" || event.key === "s") && inputDirection.y === 1) {
    inputDirection.y = 0;
  }
  if ((event.key === "ArrowRight" || event.key === "d") && inputDirection.x === 1) {
    inputDirection.x = 0;
  }
  if ((event.key === "ArrowLeft" || event.key === "a") && inputDirection.x === -1) {
    inputDirection.x = 0;
  }
});

// ^^^ note: pressing down, not releasing it, pressing right, releasing right with down still pressed down
// causes beaver to stop instead of going back to moving down as desired

const getInputDirection = () => {
  return inputDirection;
};

const getBeaverAngle = () => {
  let dir = getInputDirection();
  if (dir.x === 0 && dir.y === -1) {
    angle = 0;
  } else if (dir.x === 1 && dir.y === -1) {
    angle = 45;
  } else if (dir.x === 1 && dir.y === 0) {
    angle = 90;
  } else if (dir.x === 1 && dir.y === 1) {
    angle = 135;
  } else if (dir.x === 0 && dir.y === 1) {
    angle = 180;
  } else if (dir.x === -1 && dir.y === 1) {
    angle = 225;
  } else if (dir.x === -1 && dir.y === 0) {
    angle = 270;
  } else if (dir.x === -1 && dir.y === -1) {
    angle = 315;
  }
  return angle;
};

////////////////////////////////////
////////////////////////////////////
///             draw             ///
////////////////////////////////////
////////////////////////////////////

export const draw = (countFrame, canvasRef) => {
  canvas = canvasRef.current;
  if (!canvas) {
    return;
  }
  const context = canvas.getContext("2d", { willReadFrequently: true });

  ////////////////////////////////////
  ///      movement mechanics      ///
  ////////////////////////////////////

  const beaverDir = getInputDirection();

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

  ////////////////////////////////////
  ///  draw background and plates  ///
  ////////////////////////////////////

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

  ////////////////////////////////////
  ///        draw the beaver       ///
  ////////////////////////////////////

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
  context.translate(canvas.width / 2, canvas.height / 2);
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
  context.translate(canvas.width / 2, canvas.height / 2);
  context.restore();
  // console.log("beaver drawn");

  ////////////////////////////////////
  ///        on clicked color      ///
  ////////////////////////////////////

  window.addEventListener("click", (event) => {
    let rect = canvas.getBoundingClientRect();
    let xcoord = event.clientX - rect.left;
    let ycoord = event.clientY - rect.top;
    let pixel = context.getImageData(xcoord, ycoord, 1, 1);
    // console.log(xcoord + ", " + ycoord); // for testing
    // console.log(pixel.data[0] + ", " + pixel.data[1] + ", " + pixel.data[2]); // for testing
    if (pixel.data[0] === MITRED_R && pixel.data[1] === MITRED_G && pixel.data[2] === MITRED_B) {
      console.log("REDDDDD");
      let clickedX = mapPosition.x - xcoord;
      let clickedY = mapPosition.y - ycoord;
      // console.log(clickedX + ", " + clickedY);
      let buildingClicked;
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
      // open in same tab:
      window.location.replace("/feed");
    }
  });
};
