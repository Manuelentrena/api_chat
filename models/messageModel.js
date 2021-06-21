const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sala: { type: Schema.ObjectId, ref: "chat_sala" },
  user: { type: Schema.ObjectId, ref: "chat_user" },
  message: {
    type: String,
    required: true,
  },
  date: Date,
});

const modelMessage = mongoose.model("chat_messages", messageSchema);
module.exports = modelMessage;
