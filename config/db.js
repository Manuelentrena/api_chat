import DB from "mongoose";
import chalk from "chalk";

export default function conectedBD() {
  DB.Promise = global.Promise; //que mongoose use Promises ES6
  const URI =
    "mongodb+srv://db_user:yvwZNlSWrqFR0jJu@cluster0.zfv5o.mongodb.net/CHAT";
  /* Conectar con la BD */
  DB.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log(chalk.yellowBright("[db] Conectada con éxito")))
    .catch((err) => console.error(chalk.redBright("[db]", err)));
}
