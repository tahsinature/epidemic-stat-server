const clients = {
  firstOne: require("./client1"),
  betterOne: require("./client2"),
};

class SDK {
  getSdkSupportedCountries;
  getResultByCountryName;

  loadSdkClient = (sdkClient) => {
    const { getSdkSupportedCountries, getResultByCountryName } = sdkClient;
    if (!(getSdkSupportedCountries && getResultByCountryName)) throw new Error("sdk client not supported");

    this.getSdkSupportedCountries = getSdkSupportedCountries;
    this.getResultByCountryName = getResultByCountryName;
  };

  init = () => {
    // throw new Error("sdk failed");
  };

  ping = () => {};
}

const sdk = new SDK();
sdk.loadSdkClient(clients.betterOne);

module.exports = sdk;
