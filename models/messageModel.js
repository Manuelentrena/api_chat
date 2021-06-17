import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: String,
  message: {
    type: String,
    required: true,
  },
  date: Date,
});

const modelMessage = mongoose.model("chat_messages", messageSchema);
export default modelMessage;
