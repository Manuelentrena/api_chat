const salaModel = require("../models/salaModel");
/* Verificamos si existe el user en la BD */
function validatedSala(salaId) {
  return salaModel.exists({ _id: salaId });
}

module.exports = validatedSala;
