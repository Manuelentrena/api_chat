const userModel = require("../models/userModel");
/* Verificamos si existe el user en la BD */
function validatedUser(userId) {
  return userModel.exists({ _id: userId });
}

module.exports = validatedUser;
