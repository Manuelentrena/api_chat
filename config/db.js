import DB from "mongoose";
import chalk from "chalk";

DB.Promise = global.Promise; //que mongoose use Promises ES6

export default async function conectedBD(URI) {
  await DB.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log(chalk.yellowBright("[db] successfully connected")))
    .catch((err) => console.error(chalk.redBright("[db]", err)));
}
