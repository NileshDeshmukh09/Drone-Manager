const express = require("express");
const droneController = require("../controllers/drone.controller");
const { JWTAuth } = require("../middlewares");
const router = express.Router();



/** CREATE-DRONE - POST */
router.post("/drones", [ JWTAuth.verifyToken ], droneController.addDrone);

 /** UPDATE-DRONE - PUT */
router.put("/drones/:id", [ JWTAuth.verifyToken ], droneController.updateDrone);

 /** DELETE-DRONE - DELETE */
router.delete("/drones/:id", [ JWTAuth.verifyToken ], droneController.deleteDrone );

 /** GET_ALL-DRONES - GET */
router.get("/drones",   [ JWTAuth.verifyToken ], droneController.getAllDrones );

 /** GET-DRONE-BY-ID - GET */
router.get("/drones/:id",   [ JWTAuth.verifyToken ], droneController.getOneDrone );

module.exports = router
   