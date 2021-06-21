import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
});

const userModel = mongoose.model("chat_user", userSchema);
export default userModel;
