const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true, // obavezno
        unique: true   // jedinstveno
    },
    discount_value: {
        type: Number,
        required: true,
        min: 0  // minimalna vrednost je 0
    },
    discount_type: {
        type: String,
        enum: ["percentage", "fixed"], //popust može biti u postotku ili fiksni
        required: true
    },
    is_conjunction: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Promotions', promotionSchema);