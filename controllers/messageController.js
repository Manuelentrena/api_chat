import messageData from "../data/messageData.js";

function addMessage({ user, message }) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      return reject("Somethig data empthy in addMessage");
    }
    const fullMessage = { user, message, date: new Date().toLocaleString() };
    messageData.add(fullMessage);
    return resolve(fullMessage);
  });
}

function getMessages({ user = null, message = null }) {
  /* Creamos el filtro de búsqueda */
  let filter = {};
  user && (filter.user = new RegExp(user, "i"));
  message && (filter.message = new RegExp(message, "i"));

  return new Promise((resolve, reject) => {
    const list = messageData.list(filter);
    return resolve(list);
  });
}

function updateMessage({ id, message }) {
  return new Promise((resolve, reject) => {
    if (!id || !message) {
      return reject("Somethig data empthy in updateMessage");
    }
    const newMessage = messageData.update({ id, message });
    return resolve(newMessage);
  });
}

function deleteMessage({ id }) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      return reject("ID empthy in deleteMessage");
    }
    const deleteMessage = await messageData.delete({ id });
    if (deleteMessage === null) return reject("Message does not exit");
    return resolve(deleteMessage);
  });
}

export default { addMessage, getMessages, updateMessage, deleteMessage };
