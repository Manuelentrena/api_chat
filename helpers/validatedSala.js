import salaModel from "../models/salaModel.js";
/* Verificamos si existe el user en la BD */
export default function validatedSala(salaId) {
  return salaModel.exists({ _id: salaId });
}
