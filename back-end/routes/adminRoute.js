const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.post("/item", adminController.createItem);
router.delete("/:id", adminController.deleteItem);
router.put("/:id", adminController.updateItem);
router.get("/", adminController.getItems)


router.post("/promotions", adminController.createPromotion);
router.delete("/promotions/:id", adminController.deletePromotion);
router.put("/:id", adminController.updatePromotion);
router.get("/promotions", adminController.getPromotions)

module.exports = router;
