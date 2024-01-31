/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Story = require("./models/story");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// router.get("/stories", (req, res) => {
//   Story.find({ building_number: 1 }).then((stories) => res.send(stories));
// });

router.get("/stories", async (req, res) => {
  const stories = await Story.find({ building_number: req.query.building_number }).sort({
    creation_date: -1,
  });
  res.send(stories);
});

router.post("/story", auth.ensureLoggedIn, (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    building_number: req.body.building_number,
    post_date: req.body.post_date,
    liked_users_list: [],
  });
  newStory.save().then((story) => res.send(story));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//////// user current position ////////

router.post("/update_position", async (req, res) => {
  const user = await User.findById(req.body.userid);
  user.x_position = req.body.x;
  user.y_position = req.body.y;
  await user.save();
  // Send the updated user data in the response
  res.send(user);
});

router.get("/get_position", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    let x = req.user.x_position;
    let y = req.user.y_position;
    res.send([x, y]);
  });
});

//////// liking a post ////////

router.post("/like_toggle", auth.ensureLoggedIn, (req, res) => {
  const storyId = req.body._id; // is req.body the story obj ?
  const userId = req.body.userId; // does this work

  Story.findById(storyId)
    .then((story) => {
      const userIndex = story.liked_users_list.indexOf(userId);
      if (userIndex !== -1) {
        story.liked_users_list.splice(userIndex, 1);
      } else {
        story.liked_users_list.push(userId);
      }

      return story.save(); // Save the changes and return the updated story
    })
    .then((updatedStory) => {
      const likeCount = updatedStory.liked_users_list.length;
      res.send({ updatedStory, likeCount });
    });
});

router.get("/like_status", auth.ensureLoggedIn, (req, res) => {
  const storyId = req.query._id;
  const userId = req.query.userId;

  // Find the story and check if the user has liked it
  Story.findById(storyId).then((story) => {
    const isLiked = story.liked_users_list.includes(userId);
    res.send({ isLiked });
  });
});

router.get("/like_count", (req, res) => {
  const storyId = req.query._id;
  Story.findById(storyId).then((story) => {
    const likeCount = story.liked_users_list.length;
    res.send(String(likeCount));
  });
});

//////// avatar customization ////////

// {userid: user._id, beaverType: beaverType}
router.post("/update_avatar", async (req, res) => {
  const user = await User.findById(req.body._id); // Use req.body._id to access user ID
  user.beaverType = req.body.beaverType;
  await user.save();
  // Send the updated user data in the response
  res.send(user);
});

router.get("/get_avatar_type", (req, res) => {
  User.findById(req.query._id)
    .then((user) => {
      // Use req.query._id to access user ID
      let beaverType = user ? user.beaverType : null;

      // Check if beaverType is undefined or null, and provide a default value if needed
      if (beaverType === undefined || beaverType === null) {
        beaverType = "default"; // Replace "default" with your desired default value
      }

      // Send the response as JSON
      res.json({ beaverType });
    })
    .catch((error) => {
      console.error("Error fetching avatar type:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
