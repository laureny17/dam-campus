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
        creator_name={props.creator_name}
        content={props.content}
        building_number={props.building_number} // for the display, see singlestory.js
        // votes={props.votes}
      />
    </div>
  );
};

export default Card;
