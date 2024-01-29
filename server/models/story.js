const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  building_number: Number,
  post_date: String,
  num_likes: Number,
});

module.exports = mongoose.model("story", StorySchema);
