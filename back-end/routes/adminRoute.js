const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.post("/items/item", adminController.createItem);
router.delete("/items/:id", adminController.deleteItem);
router.put("/items/:id", adminController.updateItem);
router.get("/items", adminController.getItems)
router.get("/items/:id", adminController.getOneItem)


router.post("/promotions", adminController.createPromotion);
router.delete("/promotions/:id", adminController.deletePromotion);
router.put("/:id", adminController.updatePromotion);
router.get("/promotions", adminController.getPromotions)

module.exports = router;
