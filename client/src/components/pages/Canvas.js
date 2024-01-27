import "./Canvas.css";
import React, { useState, useEffect, useRef } from "react";
import { draw } from "../../canvas-manager";
// import { Routes, Route } from "react-router-dom";
// import { resources, drawCanvas } from "../../canvas-manager";
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

  useEffect(() => {
    let count = 0;
    let animationID;

    const renderer = () => {
      count++;
      draw(count, canvasRef); // see canvas-manager
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationID); // https://www.youtube.com/watch?v=tev71VzEJos
  }, [draw]);

  return (
    <canvas
      class="map_canvas"
      path="/map"
      ref={canvasRef}
      width={innerWidth}
      height={innerHeight}
    />
  );
};

export default Canvas;
