import message from "../routes/messageRouter.js";

export const router = (server) => {
  server.use("/message", message);
};
