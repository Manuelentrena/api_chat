import userModel from "../models/userModel.js";
/* Verificamos si existe el user en la BD */
export default function validatedUser(userId) {
  return userModel.exists({ _id: userId });
}
