const Sentry = require("@sentry/node");
const { envs, envVars } = require("./environment");

if (process.env.NODE_ENV === envs.production) Sentry.init({ dsn: envVars.SENTRY_DSN });

module.exports = Sentry;
