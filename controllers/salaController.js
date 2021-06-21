import salaData from "../data/salaData.js";
import validatedUsers from "../helpers/validatedUsers.js";
import validatedUser from "../helpers/validatedUser.js";

function createSala({ users }) {
  return new Promise(async (resolve, reject) => {
    if (!users || !Array.isArray(users)) {
      return reject("users is empthy");
    }
    /* Miramos si hay algun usuario que no existe */
    validatedUsers(users)
      .then(async (isValidate) => {
        if (isValidate) {
          const newSala = await salaData.create(users);
          return resolve(newSala);
        } else {
          return reject("At least one user doesn´t exist");
        }
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

function listSalasOfUser({ userId }) {
  return new Promise(async (resolve, reject) => {
    if (!userId) {
      return reject("userID is empthy");
    }

    validatedUser(userId)
      .then(async (validateUser) => {
        if (validateUser) {
          const listSalas = await salaData.list(userId);
          return resolve(listSalas);
        } else {
          return reject("UserID doesn´t exist");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export default { createSala, listSalasOfUser };
