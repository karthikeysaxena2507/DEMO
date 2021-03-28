const Resturant = require("../models/resturant.model");
const { cloudinary } = require("../utils/cloudinary");

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
        const user = req.user;
        if(user === null || user.username !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            var imageUrl = "";
            if(req.body.data !== "") {
                var fileStr = req.body.data;
                var uploadedResponse = await cloudinary.uploader.
                upload(fileStr, {
                    upload_preset: "socialites"
                });
                imageUrl = uploadedResponse.url;
            }
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
                imageUrl
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

const editResturant = async(req, res, next) => {
    try {
        const user = req.user;
        if(user === null || user.username !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            const resturant = await Resturant.findOne({where: {id: req.params.id}});
            var imageUrl = "";
            if(req.body.data !== "") {
                var fileStr = req.body.data;
                var uploadedResponse = await cloudinary.uploader.
                upload(fileStr, {
                    upload_preset: "socialites"
                });
                imageUrl = uploadedResponse.url;
            }
            resturant.username= req.body.username,
            resturant.owner = req.body.owner,
            resturant.name = req.body.name,
            resturant.city = req.body.city,
            resturant.state = req.body.state,
            resturant.address = req.body.address,
            resturant.createdAt = req.body.createdAt,
            resturant.about = req.body.about,
            resturant.resturant_type = req.body.resturantType,
            resturant.cuisine = req.body.cuisine,
            resturant.opensAt = req.body.opensAt,
            resturant.closesAt = req.body.closesAt,
            resturant.imageUrl = imageUrl
            resturant.save()
            .then((response) => {
                res.json(response);
            });
        }
    }
    catch(err) {
        console.log(next(err));
    }
}

module.exports = {
    getAllResturants,
    getResturantById,
    addResturant,
    getResturantIdByUser,
    editResturant
}