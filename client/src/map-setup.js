// Import necessary modules

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

export { updateCoordinates };
