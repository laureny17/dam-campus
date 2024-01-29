const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  building_number: Number,
});

module.exports = mongoose.model("story", StorySchema);
