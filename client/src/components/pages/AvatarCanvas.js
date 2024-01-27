// import "./Canvas.css";
import React, { useState, useEffect, useRef } from "react";
import { drawAvatar } from "../../avatar-canvas-manager";

const AvatarCanvas = (props) => {
  const avatarCanvasRef = useRef();
  useEffect(() => {
    let count = 0;
    let animationID;

    const renderer = () => {
      count++;
      drawAvatar(count, avatarCanvasRef); // see avatar-canvas-manager
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationID); // https://www.youtube.com/watch?v=tev71VzEJos
  }, [drawAvatar]);

  return <canvas className="avatar_canvas" ref={avatarCanvasRef} />;
};

export default AvatarCanvas;
