// ... (constants and variables)
let inputDirection = { x: 0, y: 0 };
let angle = 0;
let count = 1; // count for setting up walkFrame
let walkFrame = 1; // initial frame of beaver walk

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

export { getInputDirection, getBeaverAngle, walkFrame };
