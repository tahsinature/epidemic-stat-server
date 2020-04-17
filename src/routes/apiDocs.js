const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocs = swaggerJSDoc({
  definition: {
    info: {
      title: "Epidemic Stat API",
      version: "1.0",
      description: "All kinds of endpoints/API for Epidemic State App will be documented here.",
    },
    servers: ["http://localhost:3000"],
  },
  apis: ["src/routes/*.js"],
});

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
