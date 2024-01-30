const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  building_number: Number,
  post_date: String,
  liked_users_list: Array,
  creation_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("story", StorySchema);
