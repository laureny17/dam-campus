import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../utilities";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";
import "./Feed.css";
import { getBuilding } from "../../canvas-manager";
import { useNavigate } from "react-router-dom";

// import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
// const GOOGLE_CLIENT_ID = "644652111219-c770r1ssmkcpnnp5saugn1dj1cmct07v.apps.googleusercontent.com";
// // need { userId, handleLogin, handleLogout } inside Feed = () if want login button

const Feed = () => {
  const navigate = useNavigate();
  // let currUserId;
  // get("/api/whoami").then((user) => {
  //   currUserId = user._id;
  // });
  // post("/api/updateUserBuilding", { id: currUserId, currBuilding: getBuilding }).then((user) => {});

  const { buildingClicked } = useParams();

  const [stories, setStories] = useState([]);

  // tried to change this so that it only shows us stories from a certain building number...
  useEffect(() => {
    // console.log(buildingClicked);
    get("/api/stories", { building_number: buildingClicked }).then((storyObjs) => {
      setStories(storyObjs);
    });
  }, []);

  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      } else {
        navigate("/");
      }
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewStory = (storyObj) => {
    setStories([storyObj, ...stories]);
  };

  let storiesList = null;
  const hasStories = stories.length !== 0;

  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`} // what is this uhhh
        userId={userId} // Pass userId to Card
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
        post_date={storyObj.post_date}
        liked_users_list={storyObj.liked_users_list}
      />
    ));
  } else {
    storiesList = <div className="no-posts">No posts here yet :( be the first?</div>;
  }

  return (
    <>
      <h1>Building {buildingClicked}</h1>
      <div>
        <NewStory addNewStory={addNewStory} building_number={buildingClicked} />
        {storiesList}
      </div>
    </>
  );
};

export default Feed;
