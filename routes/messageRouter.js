import express from "express";
import { error, success } from "../connection/responses.js";
import controller from "../controllers/messageController.js";

const message = express.Router();

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

message.post("/", async (req, res) => {
  const { user, message, sala } = req.body;
  try {
    const fullMsg = await controller.addMessage({ user, message, sala });
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

export default message;
