const userModel = require("../models/userModel");
const validatedUser = require("./validatedUser");
/* Verificamos algun usuario no existe en la BD, devolvemos false en ese caso */
async function validatedUsers(users) {
  return new Promise(async (resolve, reject) => {
    const usersPromises = users.map((user) => {
      return userModel.exists({ _id: user });
    });
    Promise.all(usersPromises)
      .then((values) => {
        values.includes(false) ? resolve(false) : resolve(true);
      })
      .catch((error) => reject(error));
  });
}

module.exports = validatedUsers;
