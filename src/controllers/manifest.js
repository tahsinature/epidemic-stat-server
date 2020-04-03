const covidSdk = require("../sdk/rapidCovid");
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
    appUpdateLinks: [{ playStore: "google.com", appStore: "apple.com" }],
    updateLinks: [
      // { source: "Play Store", sourceIcon: "https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_play.png", link: "https://play.google.com/store/apps/details?id=com.github.android" },
      // { source: "Github", sourceIcon: "https://www.stickpng.com/assets/images/5847f98fcef1014c0b5e48c0.png", link: "https://github.com/clipto-pro/Desktop/releases/tag/v2.4.6" },
      {
        source: "Google Drive",
        sourceIcon: "https://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png",
        link: "https://drive.google.com/open?id=1PsyKKnhbklYjOalH4VDTE4zkFyDsfFRL"
      }
    ],
    meta: {
      supportedCountries: covidSdk.sdkSupportedCountries
    }
  });
};
