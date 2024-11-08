const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');


router.get('/', basketController.getBasket);
router.post('/addItem', basketController.addItem);
router.delete('/:id', basketController.removeItem);
router.post('/:basketId/promotion',basketController.addPromotionToBasket)



module.exports = router;
