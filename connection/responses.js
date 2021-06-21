const chalk = require("chalk");

exports.success = ({ req, res, data = {}, status = 200, msg = "" }) => {
  res.status(status).send({
    data,
    msg,
    status,
  });
};

exports.error = ({ req, res, error = "error", status = 400, info }) => {
  console.error(chalk.red(info));
  res.status(status).send({
    error,
    status,
  });
};
