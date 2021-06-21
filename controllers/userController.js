const userData = require("../data/userData");

function addUser({ name }) {
  return new Promise((resolve, reject) => {
    if (!name) {
      return reject("Name is empthy in addUser");
    }
    const user = { name, date: new Date().toLocaleString() };
    const fullUser = userData.add({ user });
    return resolve(fullUser);
  });
}

function getUsers({ name = null }) {
  /* Creamos el filtro de búsqueda */
  let filter = {};
  name && (filter.name = new RegExp(name, "i"));
  return new Promise((resolve, reject) => {
    const list = userData.list(filter);
    return resolve(list);
  });
}

module.exports = { addUser, getUsers };
