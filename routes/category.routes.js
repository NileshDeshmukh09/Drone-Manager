const express = require("express");
const categoryController = require("../controllers/category.controller");
const router = express.Router();



/** CREATE-SITE - POST */
router.post("/categories",  categoryController.createCategory );

 /** UPDATE-CATEGORY - PUT */
router.put("/categories/:id", categoryController.updateCategory );

 /** DELETE-CATEGORY - DELETE */
router.delete("/categories/:id", categoryController.deleteCategory );

 /** GET_ALL-Category - GET */
router.get("/categories",  categoryController.getAllCategories );

 /** GET-CATEGORY-BY-ID - GET */
router.get("/categories/:id", categoryController.getOneCategory);

module.exports = router
   