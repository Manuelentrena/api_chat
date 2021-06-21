const express = require("express");
const { error, success } = require("../connection/responses");
const controller = require("../controllers/salaController");

const sala = express.Router();

sala.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const listSalas = await controller.listSalasOfUser({ userId });
    success({ req, res, data: listSalas, status: 201, msg: "" });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

sala.post("/", async (req, res) => {
  const { users } = req.body;
  try {
    await controller.createSala({ users });
    success({ req, res, data: [], status: 201, msg: "added" });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

module.exports = sala;
