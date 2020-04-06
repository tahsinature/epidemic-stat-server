const Sentry = require("./util/sentry");
const express = require("express");
require("express-async-errors");
const app = express();
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const metaHeaderMiddleware = require("./middlewares/metaHeader");

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(morgan("dev"));
app.use(metaHeaderMiddleware);
app.use(routes);
app.use(errorMiddleware);

process.on("unhandledRejection", (err) => {
  console.log(err.message); // should use wins or dbug
});

process.on("uncaughtException", (err) => {
  console.log(err.message); // should use wins or dbug
});

module.exports = app;
