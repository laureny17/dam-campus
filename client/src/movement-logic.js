let inputDirection = { x: 0, y: 0 };
let angle = 0;
let count = 0;
let testcount = 0;
let walkFrame = 1; // initial frame of beaver walk
const pressedKeys = new Set();

setInterval(() => {
  if (pressedKeys.size > 0) {
    switchWalkFrame();
  }
}, 250); // Update every 0.25 seconds

const switchWalkFrame = () => {
  if (walkFrame == 1) {
    walkFrame = 2;
  } else {
    walkFrame = 1;
  }
};

// why is there a long delay in switching to frames upon pressing a new key(s)?
// ex: do a continual zigzag -> the frame won't switch at all :()
window.addEventListener("keydown", (event) => {
  pressedKeys.add(event.key);
  if (pressedKeys.has("ArrowUp") || pressedKeys.has("w")) {
    inputDirection.y = -1;
  }
  if (pressedKeys.has("ArrowDown") || pressedKeys.has("s")) {
    inputDirection.y = 1;
  }
  if (pressedKeys.has("ArrowRight") || pressedKeys.has("d")) {
    inputDirection.x = 1;
  }
  if (pressedKeys.has("ArrowLeft") || pressedKeys.has("a")) {
    inputDirection.x = -1;
  }
});

// on release of key, stop movement
window.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key);
  if (!pressedKeys.has("ArrowUp") && !pressedKeys.has("w") && inputDirection.y === -1) {
    inputDirection.y = 0;
  }
  if (!pressedKeys.has("ArrowDown") && !pressedKeys.has("s") && inputDirection.y === 1) {
    inputDirection.y = 0;
  }
  if (!pressedKeys.has("ArrowRight") && !pressedKeys.has("d") && inputDirection.x === 1) {
    inputDirection.x = 0;
  }
  if (!pressedKeys.has("ArrowLeft") && !pressedKeys.has("a") && inputDirection.x === -1) {
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
