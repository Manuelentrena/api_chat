const salaModel = require("../models/salaModel");

async function createSala(users) {
  const sala = { users };
  const mySala = new salaModel(sala);
  return await mySala.save();
}

async function listSalas(userId) {
  return new Promise(async (resolve, reject) => {
    let filter = { users: userId };
    salaModel
      .find(filter)
      .populate("users")
      .exec((err, populated) => {
        if (err) {
          return reject(err);
        }
        resolve(populated);
      });
  });
}

module.exports = {
  create: createSala,
  list: listSalas,
};
