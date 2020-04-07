const axios = require("axios");
const { HttpException } = require("../util/error");
const httpResponse = require("../util/response");
const flags = require("../util/flags");
const { NovelCovid } = require("novelcovid");

const novelCovid = new NovelCovid();

const fetchData = () => {
  return new Promise(async (res, rej) => {
    try {
      const sdkSupportedCountries = await novelCovid.countryNames();
      const response = await axios.default.get(`${novelCovid.baseURL}/countries`);
      const sdkCountryListInDetail = await response.data.map((ele) => ({
        name: ele.country,
        flag: ele.countryInfo.flag,
        alpha2Code: ele.countryInfo.iso2 || ele.country.substr(0, 2).toUpperCase(),
      }));

      sdkCountryListInDetail.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
      });
      sdkCountryListInDetail.unshift({
        name: "Worldwide",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/1280px-International_Flag_of_Planet_Earth.svg.png",
        alpha2Code: "EA", // change it later
      });
      res([sdkSupportedCountries, sdkCountryListInDetail]);
    } catch (error) {
      rej(error);
    }
  });
};

class Covid19Sdk {
  sdkSupportedCountries = [];
  sdkCountryListInDetail = [];
  constructor() {
    // do something to ready the app after this process
    fetchData().then(([countries, countriesInDetail]) => {
      countries.sort();
      countries.unshift("Worldwide");
      this.sdkSupportedCountries = countries;
      this.sdkCountryListInDetail = countriesInDetail;
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
  getSdkSupportedCountriesInDetail = () => this.sdkCountryListInDetail;
}

module.exports = new Covid19Sdk();
