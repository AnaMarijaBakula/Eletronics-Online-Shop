const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    //user: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'User',
    //    required: false  //This part needs to be done
    //},
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    promotions: [
        {
            type: mongoose.Schema.Types.ObjectId,  // References to the promotion model
            ref: 'Promotion' // Name of the model
        }
    ],
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Basket', basketSchema);
