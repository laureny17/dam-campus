import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import AvatarCanvas from "./AvatarCanvas";
import { get, post } from "../../utilities";
import { startRendering, drawAvatar } from "../../avatar-canvas-manager";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const arrowdown = <FontAwesomeIcon icon={faCircleChevronDown} />;
const arrowright = <FontAwesomeIcon icon={faChevronRight} />;
const arrowleft = <FontAwesomeIcon icon={faChevronLeft} />;

import "../../utilities.css";
import "./Home.css";

const bg_sky = new Image(4000, 3000);
bg_sky.src = "bg_sky_alt.png";
const bg_dome = new Image(4000, 3000);
bg_dome.src = "bg_dome.png";

const GOOGLE_CLIENT_ID = "644652111219-c770r1ssmkcpnnp5saugn1dj1cmct07v.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  const [offsetY, setOffsetY] = useState(0); // y scroll amount for parallax effect
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // if user clicks enter map button
  const handleMapClick = (event) => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        window.location.replace("/map");
      } else {
        return window.alert("Please sign in to enter the map!");
      }
    });
  };

  const beavers = [
    "cool_blank",
    "cool_bow",
    "cool_glasses",
    "cool_sunglasses",
    "warm_blank",
    "warm_bow",
    "warm_glasses",
    "warm_sunglasses",
  ];

  let beaverNum = 0;
  // const userBeaver = "cool_blank";

  const [currentBeaver, setCurrentBeaver] = useState(
    localStorage.getItem("userBeaver") || "cool_blank"
  );
  console.log("orig beaver: " + currentBeaver);

  const handleLeftClick = () => {
    setCurrentBeaver((prevBeaver) => {
      let index = beavers.indexOf(prevBeaver);
      index = (index + beavers.length - 1) % beavers.length;
      return beavers[index];
    });
  };

  const handleRightClick = () => {
    setCurrentBeaver((prevBeaver) => {
      let index = beavers.indexOf(prevBeaver);
      index = (index + 1) % beavers.length;
      return beavers[index];
    });
  };

  useEffect(() => {
    localStorage.setItem("userBeaver", currentBeaver);
    console.log("updated to " + currentBeaver);
  }, [currentBeaver]);

  return (
    <>
      <div className="google-button-container">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <button
              className="button-logout"
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>

      <div className="parallax">
        <img
          src={bg_sky.src}
          className="bg-sky"
          style={{
            transform: `translateY(${offsetY * 0.9}px) scale(${1 + offsetY * 0.0002})`,
          }}
        ></img>
      </div>

      <div className="main">
        <section className="dark-page">
          <div className="Title-container">
            <h1 className="title">Welcome to the Dam Campus.</h1>
            <h3 className="directions">Select your beaver:</h3>
            {/* avatar stuff below */}
            <div className="avatar-selection-container">
              <button className="canv-arrowleft" onClick={handleLeftClick}>
                {arrowleft}
              </button>
              <div className="avatar-canvas">
                <AvatarCanvas beaverType={currentBeaver} />
              </div>
              <button className="canv-arrowright" onClick={handleRightClick}>
                {arrowright}
              </button>
            </div>
            {/* avatar stuff above */}
            <center>
              <button className="enter-map-button" onClick={handleMapClick}>
                Enter the map!
              </button>
            </center>
            <a href="#tutorial">
              <button className="arrow-down">{arrowdown}</button>
            </a>
          </div>
        </section>
        <section className="light-page">
          <div className="tutorial-container">
            <h1
              // style={{ transform: `translateY(${-offsetY * 0.1}px)` }}
              className="tutorial-title"
              id="tutorial"
            >
              How to Play
            </h1>
            <h3 className="tutorial-desc-no-dome">
              Whether you're a seasoned student adventurer bursting with fun stories to tell, a
              pre-frosh with no sense of direction, or just someone passing by out of sheer
              curiosity, the Dam Campus is your ultimate virtual hub for connecting through the
              wonders of MIT's campus!
            </h3>
            <h3 className="tutorial-desc-no-dome">
              Keep an eye out for the red panels in each building—they'll lead you to the
              corresponding building page, where you can uncover the juiciest secrets of MIT's
              connected campus and the crazy cool students who roam it. Become a direct contributor
              by sharing stories, fun facts, and life pro tips of your own, or simply kick back and
              enjoy reading through the escapades of your fellow students! Ready to roll? Click that
              button and let the your adventures begin!
            </h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
