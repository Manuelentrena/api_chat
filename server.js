import express from "express";
import { router } from "./connection/routers.js";
import conectedBD from "./config/db.js";
import chalk from "chalk";
import dotenv from "dotenv";

//path de las variables de entorno
dotenv.config({ path: "variables.env" });
const { USERNAME, PASSWORD, CLUSTER, DATABASE, PORT } = process.env;
/* Abrir servidor */
var app = express();
/* Creamos la URI */
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DATABASE}`;
/* Conectar a la BD */
conectedBD(URI);
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
