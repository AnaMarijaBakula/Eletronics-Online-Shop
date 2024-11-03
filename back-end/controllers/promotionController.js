const asyncHandler = require('express-async-handler');
const Promotions = require('../models/promotionsModel');

//GET method to get all promotions
//adress : /api/promotions

const getPromotions = asyncHandler(async (req, res) => {
    const promotions = await Promotions.find();
    res.status(200).json(promotions);
});

//GET method to get a promotion by code of the promotion
//adress : /api/promotions/:code

const getOnePromotion = asyncHandler(async (req, res) => {
    const promotion = await Promotions.findOne({ code: req.params.code });
    if (!promotion) {
        res.status(404);
        throw new Error('Promotion not found');
    }
    res.status(200).json(promotion);

});

//POST method to add a promotion
//adress : /api/promotions

const createPromotion = asyncHandler(async (req, res) => {
    const { code, discount_value, discount_type, is_conjunction  } = req.body;

    if (!code || !discount_value || !discount_type || !is_conjunction == undefined) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const promotion = await Promotions.create({
        code,
        discount_value,
        discount_type,
        is_conjunction

    });
    res.status(201).json(promotion);
});

//DELETE method to delete a promotion by id
//adress : /api/promotions/:id
const deletePromotionId = asyncHandler(async (req, res) => {
    const promotion = await Promotions.findByIdAndDelete(req.params.id);
    if (!promotion) {
        res.status(404);
        throw new Error('Item not found');
    }
    res.status(200).json({promotion});
});

//DELETE method to delete a promotion by code
//adress : /api/promotions/:code
const deletePromotionCode = asyncHandler(async (req, res) => {
    const promotion = await Promotions.findOneAndDelete({ code: req.params.code });
    if (!promotion) {
        res.status(404);
        throw new Error('Promotion not found');
    }
    res.status(200).json({ message: 'Promotion deleted', promotion });
});



module.exports = { getPromotions, createPromotion, getOnePromotion, deletePromotionId, deletePromotionCode};