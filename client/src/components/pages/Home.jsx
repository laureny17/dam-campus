import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import AvatarCanvas from "./AvatarCanvas";
import { get } from "../../utilities";

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
            <h1>Welcome to the Dam Campus.</h1>
            <body className="description">Your explorer:</body>
            <AvatarCanvas />
            <center>
              {/* <a href="/map"> */}
              <button className="enter-map-button" onClick={handleMapClick}>
                Enter the map!
              </button>
              {/* </a> */}
            </center>
          </div>
        </section>
        <section className="section color-light">
          <div className="Tutorial-container">
            <h1>How to Play</h1>
            <body>to do</body>
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
