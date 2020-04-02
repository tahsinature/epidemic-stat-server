const axios = require("axios");
const _ = require("lodash");
const { HttpException } = require("../util/error");
const httpResponse = require("../util/response");
const flags = require("../util/flags");

const convertSimple = arr => {
  const dict = {};

  arr.forEach(ele => {
    if (!(ele.country in dict)) {
      dict[ele.country] = {
        confirmed: 0,
        deaths: 0,
        recovered: 0
      };
    }

    dict[ele.country].confirmed += ele.confirmed;
    dict[ele.country].deaths += ele.deaths;
    dict[ele.country].recovered += ele.recovered;
  });

  return dict;
};

const sumStat = dict => {
  // bad format check

  const data = {
    Worldwide: {
      confirmed: 0,
      deaths: 0,
      recovered: 0
    }
  };

  Object.values(dict).forEach(({ confirmed, deaths, recovered }) => {
    data.Worldwide.confirmed += confirmed;
    data.Worldwide.deaths += deaths;
    data.Worldwide.recovered += recovered;
  });

  return data;
};

const sdkCaller = new axios.default.create({
  headers: {
    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    "x-rapidapi-key": "3b82b56435msh0c59c3beaf45c78p12546fjsn9ba161d4726b"
  },
  baseURL: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats"
});

class CovidSdk {
  sdkSupportedCountries = [];
  constructor() {
    // do something to ready the app after this process
    sdkCaller.get("/").then(response => {
      const countries = _.uniq(response.data.data.covid19Stats.map(ele => ele.country));
      countries.sort();
      countries.unshift("Worldwide");
      this.sdkSupportedCountries = countries;
    });
  }
  getResultByCountryName = async countryName => {
    if (!this.sdkSupportedCountries.includes(countryName)) throw new HttpException(httpResponse.badRequest, flags.REQUESTED_COUNTRY_NOT_AVAILABLE);
    const response = await sdkCaller.get(`/?country=${countryName}`);
    const allProvinces = response.data.data.covid19Stats;
    let transformed = convertSimple(allProvinces);
    if (countryName === "Worldwide") transformed = sumStat(transformed);
    return transformed;
  };
}

module.exports = new CovidSdk();
