const Joi = require("@hapi/joi");
const dotEnv = require("dotenv-flow");
// import debug from './debugger'
// import err from './error'

const envs = {
  development: "development",
  staging: "staging",
  production: "production"
};

const defaultEnv = envs.development;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = defaultEnv;
  console.log(`No Env has been found. By default, ${defaultEnv} has been set as NODE_ENV.`);
}

dotEnv.config();

// debug.app(`Environment: ${process.env.NODE_ENV}`);

const schema = Joi.object({
  APP_PORT: Joi.number()
    .integer()
    .required(),
  DB_URI: Joi.string().required(),
  DEBUG_APP: Joi.boolean().required()
}).required();

const envVars = {
  APP_PORT: process.env.APP_PORT,
  DB_URI: process.env.DB_URI,
  DEBUG_APP: ["true", "1", "True"].includes(process.env.DEBUG_APP)
};

const validateEnvVars = () => {
  const { error } = schema.validate(envVars, { abortEarly: false });
  // if (error) throw err.getError(err.errorNames.ENVIRONMENT_VARIABLE_ERROR, error.message);
  if (error) throw error;
};

module.exports = { validateEnvVars, envVars };
