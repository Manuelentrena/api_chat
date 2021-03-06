const messageData = require("../data/messageData");
const validatedUser = require("../helpers/validatedUser");
const validatedSala = require("../helpers/validatedSala");
const validatedUserInSala = require("../helpers/validatedUserInSala");
const { socket } = require("../socket");

function addMessage({ user, message, sala, file }) {
  return new Promise((resolve, reject) => {
    /* Para la img */
    let fileURL = "";
    const { URL } = process.env;
    if (file) {
      fileURL = `${URL}/images/${file.filename}`;
    }
    /* Creamos el mensaje */
    const fullMessage = {
      sala,
      user,
      message,
      date: new Date().toLocaleString(),
      fileURL,
    };

    if (!user || !message || !sala) {
      return reject("Somethig data empthy in addMessage");
    }

    const validations = [];

    validations.push(validatedUser(user));
    validations.push(validatedSala(sala));
    validations.push(validatedUserInSala(user, sala));

    Promise.all(validations)
      .then((values) => {
        if (values.includes(false)) {
          reject("Message hasn't been validated");
        } else {
          const resMsg = messageData.add(fullMessage);
          console.log(fullMessage);
          socket.io.emit("message", fullMessage);
          resolve(resMsg);
        }
      })
      .catch((error) => reject(error));
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

module.exports = { addMessage, getMessages, updateMessage, deleteMessage };
