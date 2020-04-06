const clients = {
  firstOne: require("./client1"),
  betterOne: require("./client2"),
};

class SDK {
  sdkSupportedCountries;
  getResultByCountryName;

  loadSdkClient = (sdkClient) => {
    const { sdkSupportedCountries, getResultByCountryName } = sdkClient;
    if (!(sdkSupportedCountries && getResultByCountryName)) throw new Error("sdk client not supported");

    this.sdkSupportedCountries = sdkSupportedCountries;
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
