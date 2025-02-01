const asyncHandler = require('express-async-handler');
const Promotions = require('../models/promotionsModel');

// GET method to get a promotion by code
// Address: /api/promotions/:code
const getOnePromotion = asyncHandler(async (req, res) => {
    const promotion = await Promotions.findOne({ code: req.params.code });
    if (!promotion) {
        res.status(404);
        throw new Error('Promotion not found');
    }
    res.status(200).json(promotion);
});

module.exports = { getOnePromotion };
