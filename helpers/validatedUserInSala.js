import salaModel from "../models/salaModel.js";

export default function validatedUserInSala(userID, salaID) {
  const filter = { _id: salaID, users: userID };
  return salaModel.exists(filter);
}
