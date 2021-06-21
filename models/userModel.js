const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
});

const userModel = mongoose.model("chat_user", userSchema);
module.exports = userModel;
