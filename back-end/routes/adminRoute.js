const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.post("/", adminController.createItem);
router.delete("/:id", adminController.deleteItem);
router.put("/:id", adminController.updateItem);
router.get("/", adminController.getItems)


router.post("/", adminController.createPromotion);
router.delete("/:id", adminController.deletePromotion);
router.put("/:id", adminController.updatePromotion);
router.get("/", adminController.getPromotions)

module.exports = router;
