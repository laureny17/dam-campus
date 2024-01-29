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
  // users not signed in can still access by typing in url directly...
  // if i remove this return statement it returns a blank page for both signed in and not signed in users,
  // so this was the better alternative
  return (
    <div>
      <Canvas />
    </div>
  );
};

export default Map;
