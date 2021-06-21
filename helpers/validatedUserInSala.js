const salaModel = require("../models/salaModel");

function validatedUserInSala(userID, salaID) {
  const filter = { _id: salaID, users: userID };
  return salaModel.exists(filter);
}

module.exports = validatedUserInSala;
