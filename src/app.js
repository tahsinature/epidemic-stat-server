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
  app.listen(process.env.PORT || envVars.APP_PORT, () => {
    console.log(`server started on port ${envVars.APP_PORT}`);
  });
};

process.on("unhandledRejection", err => {
  console.log(err.message); // should use wins or dbug
});

process.on("uncaughtException", err => {
  console.log(err.message); // should use wins or dbug
});

startServer();
