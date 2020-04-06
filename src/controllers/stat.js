const response = require("../util/response");
const sdk = require("../sdk/covid19");

module.exports = async (req, res) => {
  const countryName = req.query.country;
  const data = await sdk.getResultByCountryName(countryName);
  console.log(data);

  response.success(res, data);
};
