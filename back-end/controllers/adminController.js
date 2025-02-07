const asyncHandler = require('express-async-handler');
const Items = require('../models/itemsModel');
const Promotions = require('../models/promotionsModel');

//POST method to add an item
//adress : /api/items
const createItem = asyncHandler(async (req, res) => {
    const { name, price , category , image} = req.body;

    if (!name || !price || !category || !image) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const item = await Items.create({
        name,
        price,
        category,
        image,

    });
    res.status(201).json(item);
});

//DELETE method to delete an item by id
//adress : /api/items/:id
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Items.findByIdAndDelete(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    res.status(200).json({item});
});

//PUT method to update an item by id (one field or more)
//adress : /api/admin/items/:id
const updateItem = asyncHandler(async (req, res) => {
    console.log(req.body)
    const item = await Items.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body ,{new: true});
    res.status(200).json(updatedItem);
});

//GET method to get all items
//adress : /api/items
const getItems = asyncHandler(async (req, res) => {
    const items = await Items.find();
    res.status(200).json({ items, message: 'Items route is working' });
});

// GET method to get a single item by ID
// address : /api/items/:id
const getOneItem = asyncHandler(async (req, res) => {
    const item = await Items.findById(req.params.id);

    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }

    res.status(200).json(item);
});

//POST method to add a promotion
//adress : /api/promotions
const createPromotion = asyncHandler(async (req, res) => {
    const { code, discount_value, discount_type, is_conjunction  } = req.body;

    if (!code || !discount_value || !discount_type || !is_conjunction === undefined) {
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
const deletePromotion = asyncHandler(async (req, res) => {
    const promotion = await Promotions.findByIdAndDelete(req.params.id);
    if (!promotion) {
        res.status(404);
        throw new Error('Item not found');
    }
    res.status(200).json({promotion});
});

//UPDATE method to update a promotion by id
//adress : /api/promotions/:id
const updatePromotion = asyncHandler(async (req, res) => {
    const promotion = await Promotions.findById(req.params.id);
    if (!promotion) {
        res.status(404);
        throw new Error('Item not found');
    }
    const updatedPromotion = await Promotions.findByIdAndUpdate(req.params.id, req.body ,{new: true});
    res.status(200).json(updatedPromotion);
});

//GET method to get all promotions
//adress : /api/promotions
const getPromotions = asyncHandler(async (req, res) => {
    const promotions = await Promotions.find();
    res.status(200).json(promotions);
});


module.exports = {
    createItem,
    deleteItem,
    updateItem,
    getItems,
    getOneItem,
    createPromotion ,
    deletePromotion ,
    updatePromotion,
    getPromotions
};