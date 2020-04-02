const covidSdk = require("../sdk/rapidCovid");
const response = require("../util/response");

module.exports = async (req, res) => {
  response.success(res, {
    hasAppUpdate: true,
    isAppUpdateRequired: true,
    appUpdateLinks: [{ playStore: "google.com", appStore: "apple.com" }],
    meta: {
      supportedCountries: covidSdk.sdkSupportedCountries
    }
  });
};
