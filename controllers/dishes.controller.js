const Dish = require("../models/dish.model");

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
        const user = req.user.username;
        if(user === null || user !== req.body.username) {
            res.status(401).json({Error: "You Are Not Authenticated"});
        }
        else {
            const data = {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                type: req.body.type,
                resturant_id: req.body.resturantId
            }
            const dish = await Dish.create(data);
            res.json(dish);
        }
    }
    catch(error) {
        res.json(next(error));
    }
}

module.exports = {
    getDishesByResturant,
    addDish
}