const Resturant = require("../models/resturant.model");

const getAllResturants = async(req, res, next) => {
    try {
        const resturants = await Resturant.findAll({});
        res.json(resturants);
    }
    catch(error) {
        res.json(next(error));
    }
}

const getResturantById = async(req, res, next) => {
    try {
        const resturant = await Resturant.findOne({where: {id: req.params.id}});
        res.json(resturant);
    }
    catch(error) {
        res.json(next(error));
    }
}

const addResturant = async(req, res, next) => {
    try {
        const user = req.user.username;
        if(user === null || user !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            const data = {
                username: req.body.username,
                owner: req.body.owner,
                name: req.body.name,
                city: req.body.city,
                state: req.body.state,
                address: req.body.address,
                createdAt: req.body.createdAt,
                about: req.body.about,
                resturant_type: req.body.resturantType,
                cuisine: req.body.cuisine,
                opensAt: req.body.opensAt,
                closesAt: req.body.closesAt,
            }
            const resturant = await Resturant.create(data);
            res.json(resturant);
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const getResturantIdByUser = async(req, res, next) => {
    try {
        const user = req.user;
        if(user === null) {
            res.json("DNE");
        }
        else {
            const resturant = await Resturant.findOne({where: {username: user.username}});
            if(resturant) res.json(resturant.id);
            else res.json("DNE");
        }
    }
    catch(err) {
        res.json(next(err));
    }
}

module.exports = {
    getAllResturants,
    getResturantById,
    addResturant,
    getResturantIdByUser
}