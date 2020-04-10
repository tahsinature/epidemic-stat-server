const sdk = require("../sdk");
const response = require("../util/response");
const compareVersions = require("compare-versions");
const { envVars } = require("../util/environment");

module.exports = async (req, res) => {
  const { appVersion } = req.metaData;

  response.success(res, {
    hasAppUpdate: compareVersions.compare(envVars.LATEST_MOBILE_APP_VERSION, appVersion, ">"),
    isAppUpdateRequired: compareVersions.compare(envVars.MINIMUM_MOBILE_APP_REQUIREMENT, appVersion, ">"),
    latestAppVersion: envVars.LATEST_MOBILE_APP_VERSION,
    requiredAppVersion: envVars.MINIMUM_MOBILE_APP_REQUIREMENT,
    updateLinks: [
      // { source: "Play Store", sourceIcon: "https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_play.png", link: "https://play.google.com/store/apps/details?id=com.github.android" },
      {
        source: "Google Drive",
        sourceIcon: "https://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png",
        link: "https://drive.google.com/open?id=1UcMo5b38AKwSlsmGC0dPaDkpevu9QZdI",
      },
    ],
    meta: {
      supportedCountries: sdk.getSdkSupportedCountriesInDetail(),
    },
  });
};
