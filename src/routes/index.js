const router = require("express").Router();
const statRoutes = require("./stat");
const manifestRoutes = require("./manifest");
const { HttpException } = require("../util/error");
const response = require("../util/response");
const flags = require("../util/flags");

router.use("/stat", statRoutes);
router.use("/manifest", manifestRoutes);
router.use("*", (req, res, next) => next(new HttpException(response.badRequest, flags.ROUTE_NOT_FOUND)));

module.exports = router;
