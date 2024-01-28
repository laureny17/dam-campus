import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";
import "./Feed.css";

const Feed = () => {
  const [stories, setStories] = useState([]);

  // tried to change this so that it only shows us stories from a certain building number...
  useEffect(() => {
    get("/api/stories").then((storyObjs) => {
      setStories(storyObjs);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewStory = (storyObj) => {
    setStories(stories.concat([storyObj]));
  };

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
        building_number={storyObj.building_number} // this is for the display.. i think. go to Card.js
        // votes={storyObj.votes}
      />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }
  return (
    <>
      <h1>Building</h1>
      <div>
        <NewStory addNewStory={addNewStory} />
        {storiesList}
      </div>
    </>
  );
};

export default Feed;
