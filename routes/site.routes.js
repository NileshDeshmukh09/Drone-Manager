/**
 * @swagger
 * tags:
 *   name: Sites
 *   description: APIs for managing sites
 */

const express = require("express");
const siteController = require("../controllers/site.controller");
const router = express.Router();

/**
 * @swagger
 * /sites:
 *   post:
 *     summary: Create a new site
 *     tags: [Sites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               site_name:
 *                 type: string
 *               position:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *     responses:
 *       '201':
 *         description: Site created successfully
 *       '400':
 *         description: Bad request. Invalid input data
 */

/**
 * @swagger
 * /sites/{id}:
 *   put:
 *     summary: Update an existing site
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the site to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               site_name:
 *                 type: string
 *               position:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Site updated successfully
 *       '400':
 *         description: Bad request. Invalid input data
 */

/**
 * @swagger
 * /sites/{id}:
 *   delete:
 *     summary: Delete a site by ID
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the site to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Site deleted successfully
 *       '404':
 *         description: Site not found
 */

/**
 * @swagger
 * /sites:
 *   get:
 *     summary: Get all sites
 *     tags: [Sites]
 *     responses:
 *       '200':
 *         description: A list of sites retrieved successfully
 *       '404':
 *         description: No sites found
 */

/**
 * @swagger
 * /sites/{id}:
 *   get:
 *     summary: Get a site by ID
 *     tags: [Sites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the site to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Site retrieved successfully
 *       '404':
 *         description: Site not found
 */

// POST /sites
router.post("/sites", siteController.createSite);

// PUT /sites/:id
router.put("/sites/:id", siteController.updateSite);

// DELETE /sites/:id
router.delete("/sites/:id", siteController.deleteSite);

// GET /sites
router.get("/sites", siteController.getAllSites);

// GET /sites/:id
router.get("/sites/:id", siteController.getSite);

module.exports = router;
