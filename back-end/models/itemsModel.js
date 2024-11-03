const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    promotions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotions' // Referenca na model 'Promotions'
    }]
},
    {timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);