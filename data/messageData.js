import modelMessage from "../models/messageModel.js";

function addMessage(fullMessage) {
  const fullMessageWithModel = new modelMessage(fullMessage);
  fullMessageWithModel.save();
}

async function getMessages(filter) {
  const messages = await modelMessage.find(filter);
  return messages;
}

async function updateMessage({ id, message }) {
  /* Buscamos el mensaje en la BD por ID */
  const foundMessage = await modelMessage.findOne({
    _id: id,
  });
  /* Lo modificamos */
  foundMessage.message = message;
  /* Lo guardamos en la BD */
  const newMessage = await foundMessage.save();
  return newMessage;
}

async function deleteMessage({ id }) {
  const foundMessage = await modelMessage.findOne({
    _id: id,
  });
  if (foundMessage === null) return null;
  const deleteMessage = await modelMessage.deleteOne({
    _id: id,
  });
  return deleteMessage;
}

export default {
  add: addMessage,
  list: getMessages,
  update: updateMessage,
  delete: deleteMessage,
};
