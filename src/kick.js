const { validateEnvVars, envVars } = require("./util/environment");
const app = require("./app");

const startServer = () => {
  validateEnvVars();
  const appPort = process.env.PORT || envVars.APP_PORT;

  app.listen(appPort, () => {
    console.log(`server started on port ${appPort}`);
  });
};

startServer();
