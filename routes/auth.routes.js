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



/** SIGNUP - POST */
router.post("/auth/signup", [ signupVerification.validateRequest ],  authController.signup);

 /** SIGNIN - POST */
router.post("/auth/signin", authController.signin);

module.exports = router
   