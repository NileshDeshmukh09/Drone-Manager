const express = require("express");
const droneController = require("../controllers/drone.controller");
const { JWTAuth } = require("../middlewares");
const router = express.Router();



/** CREATE-SITE - POST */
router.post("/drones", [ JWTAuth.verifyToken ], droneController.addDrone);

//  /** UPDATE-SITE - PUT */
// router.put("/sites/:id", droneController.updateSite);

 /** DELETE-SITE - DELETE */
router.delete("/drones/:id", [ JWTAuth.verifyToken ], droneController.deleteDrone );

 /** GET_ALL-DRONES - GET */
router.get("/drones",   [ JWTAuth.verifyToken ], droneController.getAllDrones );

 /** GET-SITE-BY-ID - GET */
router.get("/drones/:id",   [ JWTAuth.verifyToken ], droneController.getOneDrone );

module.exports = router
   