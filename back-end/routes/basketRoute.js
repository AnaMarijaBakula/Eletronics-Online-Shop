const express = require("express");
const router = express.Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.createEmptyBasket);



module.exports = router;