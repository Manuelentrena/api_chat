import express from "express";
import { router } from "./connection/routers.js";
import conectedBD from "./config/db.js";
import chalk from "chalk";

const PORT = 3000;

var app = express();
/* Conectar a la BD */
conectedBD();
/* Para form-encoded */
app.use(express.urlencoded({ extended: true }));
/* Para reconocer json */
app.use(express.json());

router(app);

app.use("/app", express.static("public"));

app.listen(PORT);
console.log(chalk.yellowBright(`App is runnnig on port ${PORT}`));
