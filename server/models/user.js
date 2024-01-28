const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  color: String, // not in use yet
  accessory: String, // not in use yet
  currBuilding: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
