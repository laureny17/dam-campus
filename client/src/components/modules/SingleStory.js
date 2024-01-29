import React from "react";

import "../modules/Card.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const SingleStory = (props) => {
  return (
    <div className="Card-story">
      {/* <div className="upvotes-box">{props.upvotes}</div> */}
      <span className="u-bold">{props.creator_name}</span>
      <p className="Card-storyContent">{props.content}</p>
      {/* ^^delete later, don't want to actually display building number? */}
    </div>
  );
};

export default SingleStory;
