const express = require("express");
const multer = require("multer");
const { error, success } = require("../connection/responses");
const controller = require("../controllers/messageController");

const message = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const parts = file.originalname.split(".");
    cb(null, `${parts[0]}-${Date.now()}.${parts[parts.length - 1]}`);
  },
});

let upload = multer({ storage: storage });

message.get("/", async (req, res) => {
  const filter = req.query;
  try {
    const list = await controller.getMessages(filter);
    Object.keys(list).length === 0
      ? success({ req, res, data: list, status: 200, msg: "without result" })
      : success({ req, res, data: list, status: 201 });
  } catch (info) {
    error({ req, res, error: "error", status: 500, info });
  }
});

message.post("/", upload.single("file"), async (req, res) => {
  const { user, message, sala } = req.body;
  const file = req.file;
  try {
    const fullMsg = await controller.addMessage({ user, message, sala, file });
    success({ req, res, data: fullMsg, status: 201, msg: "added" });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

message.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const newMessage = await controller.updateMessage({ id, message });
    success({ req, res, data: newMessage, status: 200, msg: "modified" });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

message.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    /* No recibimos el objeto de vuelta porque no aporta nada */
    await controller.deleteMessage({ id });
    success({ req, res, data: [], status: 200, msg: `deleted` });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

module.exports = message;
