const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

router.post('/create', basketController.createBasket);
router.get('/', basketController.getBasket);
router.post('/addItem', basketController.addItem);
router.delete('/removeItem', basketController.removeItem);



module.exports = router;
