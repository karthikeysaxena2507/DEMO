const Resturant = require("../models/resturant.model");

const getAllResturants = async(req, res, next) => {
    try {
        const resturants = await Resturant.findAll({});
        res.json(resturants);
    }
    catch(error) {
        console.log(next(error));
    }
}

const getResturantById = async(req, res, next) => {
    try {
        const resturant = await Resturant.findOne({where: {id: req.params.id}});
        res.json(resturant);
    }
    catch(error) {
        console.log(next(error));
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
                owner: req.body.owner,
                name: req.body.name,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                pureVeg: req.body.pureVeg,
                cuisine: req.body.cuisine,
                opensAt: req.body.opensAt,
                closesAt: req.body.closesAt,
            }
            const resturant = await Resturant.create(data);
            res.json(resturant);
        }
    }
    catch(error) {
        console.log(next(error));
    }
}

module.exports = {
    getAllResturants,
    getResturantById,
    addResturant
}