import React, { useState } from "react";
import { get, post } from "../../utilities";

import "./NewPostInput.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        event.preventDefault();
        props.onSubmit && props.onSubmit(value);
        setValue("");
      } else {
        window.alert("Please sign in to post!");
      }
    });
  };

  return (
    <div className="u-flex">
      <textarea
        className="NewPostInput-input"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
      >
        <input type="text" />
      </textarea>
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Story is a New Post component for stories
 */

const NewStory = (props) => {
  const addStory = (value) => {
    const body = { content: value, building_number: props.building_number };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);
    });
  };

  return <NewPostInput defaultText="Write a Post..." onSubmit={addStory} />;
};

export { NewStory };
