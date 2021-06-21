const express = require("express");
const { error, success } = require("../connection/responses");
const controller = require("../controllers/userController");

const user = express.Router();

user.get("/", async (req, res) => {
  const filter = req.query;
  try {
    const list = await controller.getUsers(filter);
    Object.keys(list).length === 0
      ? success({ req, res, data: list, status: 200, msg: "without result" })
      : success({ req, res, data: list, status: 201 });
  } catch (info) {
    error({ req, res, error: "error", status: 500, info });
  }
});

user.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const fullUser = await controller.addUser({ name });
    success({ req, res, data: fullUser, status: 201, msg: "added" });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

module.exports = user;
