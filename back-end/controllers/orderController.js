const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

//CREATE method to create an order
//adress : /api/orders
const createOrder = asyncHandler(async (req, res) => {
    const { name, email, address, orderItems, totalAmount } = req.body;

    if (!name || !email || !address || !totalAmount ) {
        res.status(400);
        throw new Error('Molimo unesite sva polja');
    }

    const order = await Order.create({
        name,
        email,
        address,
        orderItems,
        totalAmount,
    });

    res.status(201).json(order);
});

module.exports = { createOrder };