const getCoords = async () => {
  let coordinates = [2600, 975];
  const user = await fetch("/api/whoami").then((response) => response.json());
  if (user._id) {
    const pos = await fetch("/api/get_position", { userid: user._id }).then((response) =>
      response.json()
    );
    coordinates = pos;
  }
  return coordinates;
};

const updateCoordinates = async (xPos, yPos, mapPosition) => {
  const coordinates = await getCoords();
  // console.log("Coordinates:", coordinates);
  xPos = coordinates[0];
  yPos = coordinates[1];
  mapPosition.x = xPos;
  mapPosition.y = yPos;
};

const saveMapPosition = (mapPosition) => {
  const positionData = {
    position: mapPosition,
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
  localStorage.setItem("mapPositionData", JSON.stringify(positionData));
};

const adjustMapPositionForWindowSize = (positionData) => {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  const widthDiff = currentWidth - positionData.windowSize.width;
  const heightDiff = currentHeight - positionData.windowSize.height;

  positionData.position.x += widthDiff / 2;
  positionData.position.y += heightDiff / 2;

  return positionData.position;
};

// Load and adjust map position
const loadMapPosition = () => {
  const savedData = localStorage.getItem("mapPositionData");
  if (savedData) {
    const positionData = JSON.parse(savedData);
    return adjustMapPositionForWindowSize(positionData);
  } else {
    return { x: 2600, y: 975 }; // Default position
  }
};

export { updateCoordinates, saveMapPosition, loadMapPosition };
