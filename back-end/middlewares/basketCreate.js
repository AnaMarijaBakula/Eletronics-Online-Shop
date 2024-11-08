const Basket = require('../models/basketModel');

const createUserBasket = async (req, res, next) => {
    // Provjera postoji li basketId u sesiji
    if (!req.session.basketId) {
        // Ako korisnik nema korpu, kreirajte novu
        const basket = await Basket.create({
            total: 0,
            items: []
        });

        // Spremite ID korpe u sesiju
        req.session.basketId = basket._id;
        console.log("Nova korpa kreirana za korisnika, ID:", basket._id);
    } else {
        // Ako korisnik već ima korpu, dohvatite je iz baze koristeći basketId iz sesije
        const basket = await Basket.findById(req.session.basketId);
        console.log("Korisnik već ima korpu, ID:", basket._id);
    }

    next();
};

module.exports = createUserBasket;