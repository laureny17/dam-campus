import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import SingleStory from "./SingleStory.js";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */

const Card = (props) => {
  return (
    <div className="Card-container">
      <SingleStory
        _id={props._id}
        userId={props.userId} // Pass userId to SingleStory
        creator_name={props.creator_name}
        content={props.content}
        num_likes={props.num_likes}
        post_date={props.post_date}
        liked_users_list={props.liked_users_list}
      />
    </div>
  );
};

export default Card;
