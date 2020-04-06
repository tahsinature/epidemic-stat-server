const response = require("../util/response");
const sdk = require("../sdk");

module.exports = async (req, res) => {
  const countryName = req.query.country;
  const data = await sdk.getResultByCountryName(countryName);

  response.success(res, data);
};
