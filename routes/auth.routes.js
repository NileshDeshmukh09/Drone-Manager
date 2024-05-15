/**
 * Routes for Authentication and Authorization
 */

//   UserID | Passsword 

//   Nil11 | newNil11@
//   Nil02 | Customer@123
//  user02  | newUser02@

// RESTFULL -APIs for Authentication
const express = require("express");
const authController = require("../controllers/auth.controller");
const { signupVerification } = require("../middlewares");
const router = express.Router();




/** 
 * @swagger
 * /droneManager/api/v1/auth/signup: 
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request body
 */

/**
 * @swagger
 * /droneManager/api/v1/auth/signin:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Invalid credentials
 */


   



/** SIGNUP - POST */
router.post("/auth/signup", [ signupVerification.validateRequest ],  authController.signup);

 /** SIGNIN - POST */
router.post("/auth/signin", authController.signin);

module.exports = router
