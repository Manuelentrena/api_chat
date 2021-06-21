const express = require("express");
const multer = require("multer");
const { error, success } = require("../connection/responses");
const controller = require("../controllers/messageController");

const message = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const [name, extension] = file.originalname.split(".");
    console.log(file.originalname);
    cb(null, `${name}-${Date.now()}.${extension}`);
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
  /* const { message } = req.body.data; */
  console.log("ver file" + req.file);
  res.send("Exito");
  /* try {
    const fullMsg = await controller.addMessage({ user, message, sala });
    success({ req, res, data: fullMsg, status: 201, msg: "added" });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  } */
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
