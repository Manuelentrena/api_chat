const message = require("../routes/messageRouter");
const user = require("../routes/userRouter");
const sala = require("../routes/salaRoutes");

const router = (server) => {
  server.use("/message", message);
  server.use("/user", user);
  server.use("/sala", sala);
};

module.exports = router;
