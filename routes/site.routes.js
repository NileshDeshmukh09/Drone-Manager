const express = require("express");
const siteController = require("../controllers/site.controller");
const router = express.Router();



/** CREATE-SITE - POST */
router.post("/sites",  siteController.createSite);

 /** UPDATE-SITE - PUT */
router.put("/sites/:id", siteController.updateSite);

 /** DELETE-SITE - DELETE */
router.delete("/sites/:id", siteController.deleteSite);

 /** GET_ALL-SITE - GET */
router.get("/sites", siteController.getAllSites);

 /** GET-SITE-BY-ID - GET */
router.get("/sites/:id", siteController.getSite);

module.exports = router
   