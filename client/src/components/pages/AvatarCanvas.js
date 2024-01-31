// import "./Canvas.css";
import React, { useState, useEffect, useRef } from "react";
import { drawAvatar } from "../../avatar-canvas-manager";
// import { get } from "../../utilities";

const AvatarCanvas = (props) => {
  // const [userBeaver, setUserBeaver] = useState("cool_blank");
  // useEffect(() => {
  //   get("/api/whoami").then((user) => {
  //     if (user._id) {
  //       get("/api/get_avatar_type", { _id: user._id }).then((userBeaverType) =>
  //         setUserBeaver(userBeaverType)
  //       );
  //     }
  //   });
  // }, []);

  const avatarCanvasRef = useRef();
  useEffect(() => {
    let count = 0;
    let animationID;

    const renderer = () => {
      count++;
      drawAvatar(avatarCanvasRef, props.beaverType); // Pass props.beaverType as the second argument
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationID);
  }, [props.beaverType]);

  return <canvas className="avatar_canvas" ref={avatarCanvasRef} width="200" height="200" />;
};

export default AvatarCanvas;
