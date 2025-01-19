const Basket = require('../models/basketModel');

const createUserBasket = async (req, res, next) => {
    if (!req.session.basketId) {
        const basket = await Basket.create({
            total: 0,
            items: []
        });

        req.session.basketId = basket._id;
        console.log("Nova korpa kreirana za korisnika, ID:", basket._id);
    } else {
        const basket = await Basket.findById(req.session.basketId);
        console.log("Korisnik već ima korpu, ID:", basket._id);
    }

    next();
};

module.exports = createUserBasket;