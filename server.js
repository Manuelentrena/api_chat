import express from "express";
import { router } from "./connection/routers.js";
import conectedBD from "./config/db.js";
import chalk from "chalk";
/* Puerto */
const PORT = 3000;
/* Abrir servidor */
var app = express();
/* Conectar a la BD */
conectedBD();
/* Para form-encoded */
app.use(express.urlencoded({ extended: true }));
/* Para reconocer json */
app.use(express.json());
/* Pasar servidor al router */
router(app);
/* Recursos publicos */
app.use("/app", express.static("public"));
/* Escuchar por erl puerto */
app.listen(PORT);
/* Mensaje de exito */
console.log(chalk.yellowBright(`App is runnnig on port ${PORT}`));
