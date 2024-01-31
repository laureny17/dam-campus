const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  beaverType: String,
  x_position: Number,
  y_position: Number,
});

module.exports = mongoose.model("user", UserSchema);
