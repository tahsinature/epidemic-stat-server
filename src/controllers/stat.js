const response = require("../util/response");
const covidSdk = require("../sdk/rapidCovid");

module.exports = async (req, res) => {
  const countryName = req.query.country;
  if (countryName === "US") return response.serverError(res);
  const data = await covidSdk.getResultByCountryName(countryName);
  response.success(res, data);
};

// covidSdk.getResultByCountryName("Italy");
