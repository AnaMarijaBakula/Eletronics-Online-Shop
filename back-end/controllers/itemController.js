const asyncHandler = require('express-async-handler');
const Items = require('../models/itemsModel');


//GET method to get all items
//adress : /api/items
const getItems = asyncHandler(async (req, res) => {
    const items = await Items.find();
    res.status(200).json({ items, message: 'Items route is working' });
});



module.exports = { getItems};
