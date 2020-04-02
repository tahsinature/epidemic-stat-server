const { HttpException } = require("../util/error");
const response = require("../util/response");
const flags = require("../util/flags");

module.exports = (err, req, res, next) => {
  const fn = err.resFn || response.serverError;
  const flag = err.flag || flags.INTERNAL_SERVER_ERROR;
  fn(res, flag, err.message); // check for 500 error message
};
