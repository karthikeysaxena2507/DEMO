const Offer = require("../models/offer.model");

const getOffersByResturant = async(req, res, next) => {
    try {
        const offers = await Offer.findAll({where: {resturant_id: req.params.id}});
        res.json(offers);
    }
    catch(error) {
        console.log(next(error));
    }
}

const addOffer = async(req, res, next) => {
    try {
        const user = req.user.username;
        if(user === null || user !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            const data = {
                name: req.body.name,
                discount: req.body.discount,
                start_date: req.body.startDate,
                end_date: req.body.endDate,
                resturant_id: req.body.resturantId
            }
            const offer = await Offer.create(data);
            res.json(offer);
        }
    }
    catch(error) {
        console.log(next(error));
    }
}

module.exports = {
    getOffersByResturant,
    addOffer
}