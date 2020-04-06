const { HttpException } = require("../util/error");
const httpResponse = require("../util/response");
const flags = require("../util/flags");
const { NovelCovid } = require("novelcovid");

const novelCovid = new NovelCovid();

class Covid19Sdk {
  sdkSupportedCountries = [];
  constructor() {
    // do something to ready the app after this process
    novelCovid.countryNames().then((countries) => {
      countries.sort();
      countries.unshift("Worldwide");
      this.sdkSupportedCountries = countries;
    });
  }

  getResultByCountryName = async (countryName) => {
    if (!this.sdkSupportedCountries.includes(countryName)) throw new HttpException(httpResponse.badRequest, flags.REQUESTED_COUNTRY_NOT_AVAILABLE);
    const finalContryName = countryName === "Worldwide" ? "" : countryName;

    const data = await novelCovid.countries(finalContryName);

    const result = {
      [countryName]: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
    };

    if (!finalContryName) {
      data.forEach((ele) => {
        result[countryName].confirmed += ele.cases;
        result[countryName].deaths += ele.deaths;
        result[countryName].recovered += ele.recovered;
      });
    } else {
      result[countryName].confirmed = data.cases;
      result[countryName].deaths = data.deaths;
      result[countryName].recovered = data.recovered;
    }

    // improve integration testing with this

    return result;
  };

  getSdkSupportedCountries = () => this.sdkSupportedCountries;
}

module.exports = new Covid19Sdk();
