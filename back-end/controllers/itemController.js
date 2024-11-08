

const asyncHandler = require('express-async-handler');
const Items = require('../models/itemsModel');
const Promotions = require('../models/promotionsModel');


//GET method to get all items
//adress : /api/items
const getItems = asyncHandler(async (req, res) => {
    const items = await Items.find();
    res.status(200).json({ items, message: 'Items route is working' });
});

//GET method to get an item by id
//adress : /api/items/:id

const getOneItem = asyncHandler(async (req, res) => {
    const item = await Items.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    res.status(200).json(item);
});

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

//PUT/Patch method to update an item by id (one field or more)
//adress : /api/items/:id

const updateItem = asyncHandler(async (req, res) => {
    const item = await Items.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body ,{new: true});
    res.status(200).json(updatedItem);
});




module.exports = { getItems, createItem , getOneItem, deleteItem, updateItem};
