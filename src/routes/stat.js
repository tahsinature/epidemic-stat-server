const router = require("express").Router();
const statController = require("../controllers/stat");

/**
 * @swagger
 * /stat:
 *  get:
 *    description: Get result of a specific country
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", statController);

module.exports = router;
