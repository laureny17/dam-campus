import "./Canvas.css";
import React, { useState, useEffect, useRef } from "react";
import { draw } from "../../canvas-manager";

// import { Routes, Route } from "react-router-dom";
// import { handleInput } from "../../input";

const Canvas = (props) => {
  const canvasRef = useRef();

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    });
  }, []);

  let mapPosition = [0, 0];

  useEffect(() => {
    const savedMapPosition = localStorage.getItem("mapPosition");
    let mapPosition = savedMapPosition ? JSON.parse(savedMapPosition) : { x: 2600, y: 975 };

    let animationID;
    const renderer = () => {
      draw(mapPosition, canvasRef); // Call to draw with the correct parameters
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationID);
  }, []);

  return <canvas className="map_canvas" ref={canvasRef} width={innerWidth} height={innerHeight} />;
};

export default Canvas;
