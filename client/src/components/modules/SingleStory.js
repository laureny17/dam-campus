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
      <div className="flex-container">
        <p className="Card-storyLikes">{props.num_likes}</p>
        <p className="Card-storyDate">{props.post_date}</p>
      </div>
    </div>
  );
};

export default SingleStory;
