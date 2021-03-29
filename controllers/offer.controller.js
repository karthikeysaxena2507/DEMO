const Offer = require("../models/offer.model");
const helper = require("../helper/index");

const getOffersByResturant = async(req, res, next) => {
    try {
        const offers = await Offer.findAll({where: {resturant_id: req.params.id}});
        res.json(offers);
    }
    catch(error) {
        res.json(next(error));
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
                name: helper.sanitize(req.body.name),
                discount: helper.sanitize(req.body.discount),
                start_date: helper.sanitize(req.body.startDate),
                end_date: helper.sanitize(req.body.endDate),
                resturant_id: helper.sanitize(req.body.resturantId)
            }
            const offer = await Offer.create(data);
            res.json(offer);
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

module.exports = {
    getOffersByResturant,
    addOffer
}