import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";

const GOOGLE_CLIENT_ID = "644652111219-c770r1ssmkcpnnp5saugn1dj1cmct07v.apps.googleusercontent.com";
gsap.registerPlugin(ScrollTrigger);

const Home = ({ userId, handleLogin, handleLogout }) => {
  useEffect(() => {
    const scrollBar = Scrollbar.init(document.querySelector(".main"), {
      delegateTo: document,
      alwaysShowTracks: false,
      speed: 0.5,
    });

    scrollBar.addListener(ScrollTrigger.update);

    gsap.fromTo(
      ".main",
      {
        backgroundColor: "#9b6b5e" /* brown initial background color */,
      },
      {
        scrollTrigger: {
          trigger: ".color-light",
          scrub: true,
          end: "bottom bottom" /* uncomment to view scroller markers*/,
          /*markers: true,*/
        },
        backgroundColor: "#ffffff" /* white after background color */,
      }
    );

    return () => {};
  }, []);

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
            <body>
              "Logged in as ____" if logged in, "Please log in to access the map" or smth if not
            </body>
            <body>Insert avatar image here if logged in</body>
            <body>
              Button or text "click to enter?" or smth here to switch to map page to enter the game?
            </body>
          </div>
        </section>
        <section className="section color-light">
          <div className="Tutorial-container">
            <h1>How to Play</h1>
            <body>tutorial</body>
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
