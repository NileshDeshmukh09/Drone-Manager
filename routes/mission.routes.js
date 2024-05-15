/**
 * @swagger
 * tags:
 *   name: Missions
 *   description: APIs for managing missions
 */

const express = require("express");
const missionController = require("../controllers/mission.controller");
const { JWTAuth } = require("../middlewares");
const router = express.Router();

/**
 * @swagger
 * /droneManager/api/v1/missions:
 *   post:
 *     summary: Create a new mission
 *     tags: [Missions]
 *     security:
 *       - bearerAuth: []
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
 *               alt:
 *                 type: number
 *               speed:
 *                 type: number
 *               name:
 *                 type: string
 *               waypoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     alt:
 *                       type: number
 *                     lat:
 *                       type: number
 *                     lng:
 *                       type: number
 *               categoryID:
 *                 type: string
 *               siteID:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Mission created successfully
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid
 */

/**
 * @swagger
 * /droneManager/api/v1/missions/{id}:
 *   put:
 *     summary: Update an existing mission
 *     tags: [Missions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mission to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alt:
 *                 type: number
 *               speed:
 *                 type: number
 *               name:
 *                 type: string
 *               waypoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     alt:
 *                       type: number
 *                     lat:
 *                       type: number
 *                     lng:
 *                       type: number
 *               categoryID:
 *                 type: string
 *               siteID:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Mission updated successfully
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid
 */

/**
 * @swagger
 * /droneManager/api/v1/missions:
 *   get:
 *     summary: Get all missions
 *     tags: [Missions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: string
 *         description: Username of the mission creator for filtering
 *       - in: query
 *         name: siteID
 *         schema:
 *           type: string
 *         description: ID of the site for filtering
 *       - in: query
 *         name: categoryID
 *         schema:
 *           type: string
 *         description: ID of the category for filtering
 *     responses:
 *       '200':
 *         description: A list of missions retrieved successfully
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid
 */

/**
 * @swagger
 * /droneManager/api/v1/missions/{id}:
 *   get:
 *     summary: Get a mission by ID
 *     tags: [Missions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: Authentication token (JWT)
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mission to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Mission retrieved successfully
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid
 */

// POST /missions
router.post("/missions", [JWTAuth.verifyToken], missionController.createMission);

// PUT /missions/:id
router.put("/missions/:id", [JWTAuth.verifyToken], missionController.updateMission);

// GET /missions
router.get("/missions", [JWTAuth.verifyToken], missionController.getAllMissions);

// GET /missions/:id
router.get("/missions/:id", [JWTAuth.verifyToken], missionController.getOneMission);

module.exports = router;
