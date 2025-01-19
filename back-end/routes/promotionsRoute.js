const express = require("express");
const router = express.Router();
const promotionsController = require("../controllers/promotionController");


router.get("/:code", promotionsController.getOnePromotion);


module.exports = router;