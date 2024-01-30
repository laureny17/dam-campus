import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import AvatarCanvas from "./AvatarCanvas";
import { get } from "../../utilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt } from "@fortawesome/free-solid-svg-icons";

const shirtIcon = <FontAwesomeIcon icon={faShirt} />;

import "../../utilities.css";
import "./Home.css";

const GOOGLE_CLIENT_ID = "644652111219-c770r1ssmkcpnnp5saugn1dj1cmct07v.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  const handleMapClick = (event) => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        window.location.replace("/map");
      } else {
        return window.alert("Please sign in to enter the map!");
      }
    });
  };

  return (
    <>
      <div className="Button-container">
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
      <section className="main">
        <section className="section color-dark">
          <div className="Title-container">
            <h1 className="first-page">Welcome to the Dam Campus.</h1>
            <h3 className="description">Your explorer:</h3>
            <AvatarCanvas />
            <center>
              <button className="customization-button">{shirtIcon}</button>
            </center>
            <center>
              <button className="enter-map-button" onClick={handleMapClick}>
                Enter the map!
              </button>
            </center>
          </div>
        </section>
        <section className="section color-light">
          <div className="Tutorial-container">
            <h1>How to Play</h1>
            <h3 className="Tutorial-explanation">
              Whether you're a seasoned student adventurer bursting with fun stories to tell, a
              pre-frosh with no sense of direction, or just someone passing by out of sheer
              curiosity, the Dam Campus is your ultimate virtual hub for connecting through the
              wonders of MIT's campus! Join the fun on our homepage where you can gear up and
              customize your beaver to get ready to enter Lobby 7. Returning user? No worries, we've
              got your back, dropping you right back into the action where you left off. Keep an eye
              out for those sneaky red panels in each building—-they'll lead you to the
              corresponding building page, where you can uncover the juiciest secrets of MIT's
              connected campus and the crazy cool students who roam it. Become a direct contributor
              by sharing your own tales and fun facts, or simply kick back and enjoy reading through
              the escapades of your fellow students! Ready to roll? Click that button and let the
              your adventures begin!"
            </h3>
            <h3> </h3>
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
