import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../utilities";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";
import "./Feed.css";
import { getBuilding } from "../../canvas-manager";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const { buildingClicked } = useParams();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    get("/api/stories", { building_number: buildingClicked }).then((storyObjs) => {
      setStories(storyObjs);
    });
  }, []);

  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
      } else {
        navigate("/");
      }
    });
  }, []);

  // when users clicks submit
  const addNewStory = (storyObj) => {
    setStories([storyObj, ...stories]);
  };

  let storiesList = null;
  const hasStories = stories.length !== 0;

  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
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
      <div className="background">
        <div className="pattern pattern"></div>
      </div>
      <h1>Building {buildingClicked}</h1>
      <div>
        <NewStory addNewStory={addNewStory} building_number={buildingClicked} />
        {storiesList}
      </div>
    </>
  );
};

export default Feed;
