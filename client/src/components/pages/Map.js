import React, { useState, useEffect } from "react";
import Canvas from "./Canvas.js";
// import { handleInput } from "../../input";

import "../../utilities.css";

// import { socket } from "../../client-socket.js";
// import { get, post } from "../../utilities.js";

import "./Map.css";

const Map = () => {
  return (
    <div>
      <Canvas />
    </div>
  );
};

export default Map;
