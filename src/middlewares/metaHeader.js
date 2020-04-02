const { HttpException } = require("../util/error");
const response = require("../util/response");
const flags = require("../util/flags");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  appVersion: Joi.string().required(),
  systemVersion: Joi.string().required(),
  model: Joi.string().required()
}).required();

module.exports = (req, res, next) => {
  let metaData = req.headers["meta-data"];

  if (!metaData) throw new HttpException(response.badRequest, flags.META_HEADER_NOT_PRESENT, "Meta header not found");

  try {
    metaData = JSON.parse(metaData);
    const { error } = schema.validate(metaData, { abortEarly: false, convert: false });
    if (error) throw error;
  } catch (error) {
    if (error.name === "SyntaxError") error.message = "Meta data not stringified properly";
    throw new HttpException(response.badRequest, flags.INVALID_META_HEADER, error.message);
  }

  req.metaData = metaData;

  next();
};
