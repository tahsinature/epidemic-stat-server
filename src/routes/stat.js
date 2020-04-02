const router = require("express").Router();
const statController = require("../controllers/stat");

router.get("/", statController);

module.exports = router;
