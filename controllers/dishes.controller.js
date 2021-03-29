const Dish = require("../models/dish.model");
const helper = require("../helper/index");

const getDishesByResturant = async(req, res, next) => {
    try {
        const dishes = await Dish.findAll({where: {resturant_id: req.params.id}});
        res.json(dishes);
    }
    catch(error) {
        res.json(next(error));
    }
}

const addDish = async(req, res, next) => {
    try {
        const user = req.user;
        if(user === null || user.username !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            const data = {
                name: helper.sanitize(req.body.name),
                category: helper.sanitize(req.body.category),
                price: helper.sanitize(req.body.price),
                type: helper.sanitize(req.body.type),
                resturant_id: helper.sanitize(req.body.resturantId)
            }
            const dish = await Dish.create(data);
            res.json(dish);
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

const removeDish = async(req, res, next) => {
    try {
        const user = req.user;
        if(user === null || user.username !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            const dish = await Dish.findOne({where: {id: req.params.id}});
            dish.destroy()
            .then((response) => {
                res.json(response);
            });
        }
    }
    catch(err) {
        res.json(next(err));
    }
}

module.exports = {
    getDishesByResturant,
    addDish,
    removeDish
}