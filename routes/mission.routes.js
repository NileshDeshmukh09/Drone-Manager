const express = require("express");
const missionController = require("../controllers/mission.controller");
const { JWTAuth } = require("../middlewares");
const router = express.Router();



/** CREATE-Mission - POST */
router.post("/missions", [ JWTAuth.verifyToken ], missionController.createMission);

//  /** UPDATE-MISSION - PUT */
router.put("/missions/:id", [ JWTAuth.verifyToken ], missionController.updateMission);

//  /** DELETE-DRONE - DELETE */
// router.delete("/drones/:id", [ JWTAuth.verifyToken ], droneController.deleteDrone );

 /** GET_ALL-DRONES - GET */
router.get("/missions",   [ JWTAuth.verifyToken ], missionController.getAllMissions );

//  /** GET-DRONE-BY-ID - GET */
router.get("/missions/:id",   [ JWTAuth.verifyToken ], missionController.getOneMission );

module.exports = router
   