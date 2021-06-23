const express = require("express");
/* Abrir servidor */
const app = express();
const server = require("http").Server(app);

const router = require("./connection/routers");
const conectedBD = require("./config/db");
const chalk = require("chalk");
const dotenv = require("dotenv");
const socket = require("./socket");

//path de las variables de entorno
dotenv.config({ path: "variables.env" });
const { USERNAME, PASSWORD, CLUSTER, DATABASE, PORT } = process.env;
/* Creamos la URI */
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DATABASE}`;
/* Conectar a la BD */
conectedBD(URI);
/* Para form-encoded */
app.use(express.urlencoded({ extended: true }));
/* Para reconocer json */
app.use(express.json());
/* Conectar al Socket */
socket.connect(server);
/* Pasar servidor al router */
router(app);
/* Recursos publicos */
app.use("/app", express.static("public"));
/* Escuchar por erl puerto */
server.listen(PORT, () => {
  /* Mensaje de exito */
  console.log(chalk.yellowBright(`Server is listening on port ${PORT}`));
});
