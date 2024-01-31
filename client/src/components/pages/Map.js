import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Canvas from "./Canvas.js";
import { get } from "../../utilities";
// import { handleInput } from "../../input";

import "../../utilities.css";

// import { socket } from "../../client-socket.js";
// import { get, post } from "../../utilities.js";

import "./Map.css";

const Map = () => {
  // const userAvatar = localStorage.getItem("userBeaver") || "defaultAvatar";
  const navigate = useNavigate();
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        return (
          <div>
            <Canvas />
          </div>
        );
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <Canvas />
    </div>
  );
};

export default Map;
