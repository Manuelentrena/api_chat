const userModel = require("../models/userModel");

async function addUser({ user }) {
  const myUser = new userModel(user);
  return await myUser.save();
}

async function getUsers(filter) {
  const users = await userModel.find(filter);
  return users;
}

module.exports = {
  add: addUser,
  list: getUsers,
};
