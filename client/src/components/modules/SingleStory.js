import React, { useState, useEffect } from "react";

import "../modules/Card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { post, get } from "../../utilities";

const outlineHeart = <FontAwesomeIcon icon={faRegularHeart} style={{ color: "#8b959e" }} />;
const solidHeart = <FontAwesomeIcon icon={faSolidHeart} style={{ color: "#750014" }} />;

// ReactDOM.render(outlineHeart, document.body);

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const SingleStory = (props) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.liked_users_list.length);

  let heartIcon;
  if (liked) {
    heartIcon = <FontAwesomeIcon icon={faSolidHeart} style={{ color: "#750014" }} />;
  } else {
    heartIcon = <FontAwesomeIcon icon={faRegularHeart} style={{ color: "#8b959e" }} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      const likeStatus = await get("/api/like_status", {
        _id: props._id,
        userId: props.userId,
      });
      setLiked(likeStatus.isLiked);
    };
    fetchData();
    setLikeCount(props.liked_users_list.length);
  }, [props._id, props.userId, props.liked_users_list]);

  const handleLikeClick = async () => {
    setLiked(!liked);
    const response = await post("/api/like_toggle", { _id: props._id, userId: props.userId });
    const { updatedStory, likeCount: updatedLikeCount } = response;
    setLikeCount(updatedLikeCount);
  };
  return (
    <div className="Card-story">
      {/* <div className="upvotes-box">{props.upvotes}</div> */}
      <span className="u-bold">{props.creator_name}</span>
      <p className="Card-storyContent">{props.content}</p>
      <div className="flex-container">
        <button onClick={handleLikeClick} className="heart-button">
          {heartIcon}
        </button>
        <span>
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
        <p className="Card-storyDate">{props.post_date}</p>
      </div>
    </div>
  );
};

export default SingleStory;
