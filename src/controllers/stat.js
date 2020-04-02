const response = require("../util/response");
const covidSdk = require("../sdk/rapidCovid");

module.exports = async (req, res) => {
  const countryName = req.query.country;
  const data = await covidSdk.getResultByCountryName(countryName);
  response.success(res, data);
};
