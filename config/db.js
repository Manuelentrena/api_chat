import DB from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

//path de las variables de entorno
dotenv.config({ path: "variables.env" });

const { USERNAME, PASSWORD, CLUSTER, DATABASE } = process.env;

export default function conectedBD() {
  DB.Promise = global.Promise; //que mongoose use Promises ES6
  const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DATABASE}`;
  DB.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log(chalk.yellowBright("[db] Conectada con éxito")))
    .catch((err) => console.error(chalk.redBright("[db]", err)));
}
