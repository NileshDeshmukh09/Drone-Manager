/**
 * @swagger
 * tags:
 *   name: Drones
 *   description: APIs for managing drones
 */

/**
 * @swagger
 * /droneManager/api/v1/drones:
 *   post:
 *     summary: Create a new drone
 *     tags: [Drones]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               droneType:
 *                 type: string
 *               makeName:
 *                 type: string
 *               name:
 *                 type: string
 *               siteID:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Drone created successfully
 *       '401':
 *         description: Unauthorized. Authentication token (x-access-token) is required
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /droneManager/api/v1/drones/{id}:
 *   put:
 *     summary: Update an existing drone
 *     tags: [Drones]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the drone to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               droneType:
 *                 type: string
 *               makeName:
 *                 type: string
 *               name:
 *                 type: string
 *               siteID:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Drone updated successfully
 *       '401':
 *         description: Unauthorized. Authentication token (x-access-token) is required
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /droneManager/api/v1/drones/{id}:
 *   delete:
 *     summary: Delete a drone by ID
 *     tags: [Drones]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the drone to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Drone deleted successfully
 *       '401':
 *         description: Unauthorized. Authentication token (x-access-token) is required
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /droneManager/api/v1/drones:
 *   get:
 *     summary: Get all drones
 *     tags: [Drones]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: query
 *         name: siteID
 *         required: false
 *         description: Filter by site ID
 *     responses:
 *       '200':
 *         description: A list of drones retrieved successfully
 *       '401':
 *         description: Unauthorized. Authentication token (x-access-token) is required
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /droneManager/api/v1/drones/{id}:
 *   get:
 *     summary: Get a drone by ID
 *     tags: [Drones]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the drone to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Drone retrieved successfully
 *       '401':
 *         description: Unauthorized. Authentication token (x-access-token) is required
 *     security:
 *       - bearerAuth: []
 */

const express = require("express");
const droneController = require("../controllers/drone.controller");
const { JWTAuth } = require("../middlewares");
const router = express.Router();

// POST /drones
router.post("/drones", [JWTAuth.verifyToken], droneController.addDrone);

// PUT /drones/:id
router.put("/drones/:id", [JWTAuth.verifyToken], droneController.updateDrone);

// DELETE /drones/:id
router.delete("/drones/:id", [JWTAuth.verifyToken], droneController.deleteDrone);

// GET /drones
router.get("/drones", [JWTAuth.verifyToken], droneController.getAllDrones);

// GET /drones/:id
router.get("/drones/:id", [JWTAuth.verifyToken], droneController.getOneDrone);

module.exports = router;
