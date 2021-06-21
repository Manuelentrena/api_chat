const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const salaSchema = new Schema({
  users: [{ type: Schema.ObjectId, ref: "chat_user" }],
});

const salaModel = mongoose.model("chat_sala", salaSchema);
module.exports = salaModel;
