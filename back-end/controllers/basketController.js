const asyncHandler = require('express-async-handler');
const Basket = require('../models/basketModel');
const Item = require('../models/itemsModel');
const session = require('express-session');


//POST method to create an empty basket
// adress: /api/basket

const createEmptyBasket = asyncHandler(async (req, res) => {
    const basket = await Basket.create({
        items: [],
        promotions: [],
        total: 0
    });
    if(!basket) {
        res.status(400);
        throw new Error('Basket not created');
    };
    req.session.basketId = basket._id;
    res.status(201).json({basket});
});



module.exports = { createEmptyBasket};

