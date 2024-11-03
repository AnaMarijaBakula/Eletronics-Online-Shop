const express = require("express");
const router = express.Router();
const promotionsController = require("../controllers/promotionController");

router.get("/", promotionsController.getPromotions)
router.post("/", promotionsController.createPromotion);
router.get("/:code", promotionsController.getOnePromotion);
router.delete("/:id", promotionsController.deletePromotionId);
router.delete("/:code/:code", promotionsController.deletePromotionCode);


module.exports = router;