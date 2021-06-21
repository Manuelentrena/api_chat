import userModel from "../models/userModel.js";

async function addUser({ user }) {
  const myUser = new userModel(user);
  return await myUser.save();
}

async function getUsers(filter) {
  const users = await userModel.find(filter);
  return users;
}

export default {
  add: addUser,
  list: getUsers,
};
