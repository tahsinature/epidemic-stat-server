const router = require("express").Router();
const manifestController = require("../controllers/manifest");

router.get("/", manifestController);

module.exports = router;
