const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");

router.get("/", itemsController.getItems)
router.post("/", itemsController.createItem);
router.get("/:id", itemsController.getOneItem);
router.delete("/:id", itemsController.deleteItem);
router.put("/:id", itemsController.updateItem);
router.post('/:itemId/promotions/:promotionId', itemsController.addPromotionToItem);




module.exports = router;
