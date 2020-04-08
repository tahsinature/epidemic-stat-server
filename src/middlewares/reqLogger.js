const { envVars } = require("../util/environment");
const axios = require("axios");

const log = (method, url, body, headers, response) => {
  const data = {
    headers,
    body,
    response,
  };

  const destinationUrl = envVars.REQUESTBIN_URI + url;

  if (method === "get") axios[method](destinationUrl, { data });
  else axios[method](url, data);
};

module.exports = (req, res, next) => {
  const original = res.send;
  const custom = function () {
    const response = JSON.parse(arguments[0]);
    delete response.data;
    log(req.method.toLowerCase(), req.url, req.body, req.headers, response);
    original.apply(this, arguments);
  };
  res.send = custom;
  next();
};
