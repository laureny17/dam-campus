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

router.get("/stories", (req, res) => {
  console.log(req.query.building_number);
  Story.find({ building_number: req.query.building_number }).then((stories) => res.send(stories));
  // Story.find({ building_number: req.user.currBuilding }).then((stories) => res.send(stories));
});

router.post("/story", auth.ensureLoggedIn, (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    building_number: req.body.building_number,
    // building_number: req.body.building_number, // works if manually type in a number
    // votes: req.body.upvotes, // do if there is time
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

//////// avatar customization ////////

// {userid: user._id, color: color, accessory: accessory}
router.post("/update_avatar", async (req, res) => {
  const user = await User.findById(req.body.userid);
  user.color = req.body.color;
  user.accessory = req.body.accessory;
  await user.save();
  // Send the updated user data in the response
  res.send(user);
});

// {userid: user._id}
router.get("/get_avatar_type", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    let color = req.user.color;
    let accessory = req.user.accessory;
    res.send([color, accessory]);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
