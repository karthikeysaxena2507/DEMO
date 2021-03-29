const Resturant = require("../models/resturant.model");
const { cloudinary } = require("../utils/cloudinary");
const helper = require("../helper/index");

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
                username: helper.sanitize(req.body.username),
                owner: helper.sanitize(req.body.owner),
                name: helper.sanitize(req.body.name),
                city: helper.sanitize(req.body.city),
                state: helper.sanitize(req.body.state),
                address: helper.sanitize(req.body.address),
                createdAt: helper.sanitize(req.body.createdAt),
                about: helper.sanitize(req.body.about),
                resturant_type: helper.sanitize(req.body.resturantType),
                cuisine: helper.sanitize(req.body.cuisine),
                opensAt: helper.sanitize(req.body.opensAt),
                closesAt: helper.sanitize(req.body.closesAt),
                imageUrl: helper.sanitize(imageUrl)
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
            resturant.username= helper.sanitize(req.body.username);
            resturant.owner = helper.sanitize(req.body.owner);
            resturant.name = helper.sanitize(req.body.name);
            resturant.city = helper.sanitize(req.body.city);
            resturant.state = helper.sanitize(req.body.state);
            resturant.address = helper.sanitize(req.body.address);
            resturant.createdAt = helper.sanitize(req.body.createdAt);
            resturant.about = helper.sanitize(req.body.about);
            resturant.resturant_type = helper.sanitize(req.body.resturantType);
            resturant.cuisine = helper.sanitize(req.body.cuisine);
            resturant.opensAt = helper.sanitize(req.body.opensAt);
            resturant.closesAt = helper.sanitize(req.body.closesAt);
            resturant.imageUrl = helper.sanitize(imageUr);
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