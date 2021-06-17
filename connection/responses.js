import chalk from "chalk";

export const success = ({ req, res, data = {}, status = 200 }) => {
  res.status(status).send({
    data,
    status,
  });
};

export const error = ({ req, res, error = "error", status = 400, info }) => {
  console.error(chalk.red(info));
  res.status(status).send({
    error,
    status,
  });
};
