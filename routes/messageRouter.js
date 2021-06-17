import express from "express";
import { error, success } from "../connection/responses.js";
import controller from "../controllers/messageController.js";

const message = express.Router();

message.get("/", async (req, res) => {
  const filter = req.query;
  try {
    const list = await controller.getMessages(filter);
    Object.keys(list).length === 0
      ? success({ req, res, data: list, status: 200 })
      : success({ req, res, data: list, status: 201 });
  } catch (info) {
    error({ req, res, error: "error", status: 500, info });
  }
});

message.post("/", async (req, res) => {
  const { user, message } = req.body;
  try {
    const fullMsg = await controller.addMessage({ user, message });
    success({ req, res, data: fullMsg, status: 201 });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

message.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const newMessage = await controller.updateMessage({ id, message });
    success({ req, res, data: newMessage, status: 200 });
  } catch (info) {
    error({ req, res, error: "error", status: 400, info });
  }
});

export default message;
