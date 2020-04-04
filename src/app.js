const express = require("express");
require("express-async-errors");
const app = express();
const { validateEnvVars, envVars } = require("./util/environment");
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const metaHeaderMiddleware = require("./middlewares/metaHeader");

app.use(cors());
app.use(morgan("dev"));
app.use(metaHeaderMiddleware);
app.use(routes);
app.use(errorMiddleware);

const startServer = () => {
  validateEnvVars();
  const appPort = process.env.PORT || envVars.APP_PORT;
  app.listen(appPort, () => {
    console.log(`server started on port ${appPort}`);
  });
};

process.on("unhandledRejection", (err) => {
  console.log(err.message); // should use wins or dbug
});

process.on("uncaughtException", (err) => {
  console.log(err.message); // should use wins or dbug
});

startServer();
