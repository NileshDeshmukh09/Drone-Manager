/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Endpoints for Home resource
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get home information
 *     tags: [Home]
 *     description: Retrieve information about the home resource
 *     responses:
 *       '200':
 *         description: Home information retrieved successfully
 *       '500':
 *         description: Internal server error
 */

const express = require("express");
const homeController = require("../controllers/home.controller");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get home information
 *     tags: [Home]
 *     description: Retrieve information about the home resource
 *     responses:
 *       '200':
 *         description: Home information retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/", homeController.home);

module.exports = router;
