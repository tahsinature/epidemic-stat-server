const clients = {
  firstOne: require("./client1"),
  betterOne: require("./client2"),
};

class SDK {
  getSdkSupportedCountries;
  getResultByCountryName;
  getSdkSupportedCountriesInDetail;

  loadSdkClient = (sdkClient) => {
    const { getSdkSupportedCountries, getResultByCountryName, getSdkSupportedCountriesInDetail } = sdkClient;
    if (!(getSdkSupportedCountries && getResultByCountryName && getSdkSupportedCountriesInDetail)) throw new Error("sdk client not supported");

    this.getSdkSupportedCountries = getSdkSupportedCountries;
    this.getResultByCountryName = getResultByCountryName;
    this.getSdkSupportedCountriesInDetail = getSdkSupportedCountriesInDetail;
  };

  init = () => {
    // throw new Error("sdk failed");
  };

  ping = () => {};
}

const sdk = new SDK();
sdk.loadSdkClient(clients.betterOne);

module.exports = sdk;
