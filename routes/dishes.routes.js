const router = require("express").Router();
const dishesCtrl = require("../controllers/dishes.controller");
const authMiddleware = require("../middleware/auth");

router.get("/get/:id", dishesCtrl.getDishesByResturant);

router.post("/add", authMiddleware, dishesCtrl.addDish);

router.post("/remove/:id", authMiddleware, dishesCtrl.removeDish);

module.exports = router;