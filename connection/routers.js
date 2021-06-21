import message from "../routes/messageRouter.js";
import user from "../routes/userRouter.js";
import sala from "../routes/salaRoutes.js";

export const router = (server) => {
  server.use("/message", message);
  server.use("/user", user);
  server.use("/sala", sala);
};
