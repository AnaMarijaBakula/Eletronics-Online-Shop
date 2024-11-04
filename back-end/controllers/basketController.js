const asyncHandler = require('express-async-handler');
const Basket = require('../models/basketModel');
const Item = require('../models/itemsModel');



//POST method to create a basket
//adress : /api/basket/create
const createBasket = asyncHandler(async (req, res) => {
    const basket = new Basket();
    await basket.save();
    req.session.basketId = basket._id;
    res.json(basket);
});

//GET method to get  basket
//adress : /api/basket
const getBasket = asyncHandler(async (req, res) => {
    const basket = await Basket.find();
    res.status(200).json(basket);
});

//POST method to add an item to the basket
//adress : /api/basket/addItem
const addItem = asyncHandler(async (req, res) => {
    const { itemId } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    if (req.session.basketId) {
        basket = await Basket.findById(req.session.basketId);
    }

    const itemPriceAdd = item.price;
    const itemInBasket = basket.items.findIndex(item => item.item == itemId);
    if (itemInBasket === -1) {
        basket.items.push({ item: itemId, quantity : 1 });
        basket.total += itemPriceAdd;
    } else {
        basket.items[itemInBasket].quantity += 1;
        basket.total += itemPriceAdd;
    }


    await basket.save();
    res.json(basket);
});

//DELETE method to delete an item by id
//adress : /api/items/removeItem

const removeItem = asyncHandler(async (req, res) => {
    const { itemId } = req.body;

    const item = await Item.findById(itemId);
    const basket = await Basket.findById(req.session.basketId);
    if (!basket) {
        return res.status(404).json({ message: 'Basket not found' });
    }

    const itemPriceRemove = item.price;2
    const itemInBasket = basket.items.findIndex(item => item.item == itemId);
    if (itemInBasket === -1) {
        return res.status(404).json({ message: 'Item not found in basket' });
    }

    if (basket.items[itemInBasket].quantity > 1) {
        basket.items[itemInBasket].quantity -= 1;
        basket.total -= itemPriceRemove;
    } else {
        basket.items.splice(itemInBasket, 1);
        basket.total -= itemPriceRemove;
    }

    await basket.save(); // Spremi promjene u bazu
    res.json({ message: 'Item quantity updated or removed from basket', basket });
});

module.exports = {createBasket , getBasket, addItem, removeItem};
