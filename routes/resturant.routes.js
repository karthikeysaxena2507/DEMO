const router = require("express").Router();
const resturantCtrl = require("../controllers/resturant.controller");
const authMiddleware = require("../middleware/auth");

router.get("/get/all", resturantCtrl.getAllResturants);

router.get("/get/:id", resturantCtrl.getResturantById);

router.post("/add", authMiddleware, resturantCtrl.addResturant);

router.get("/check", authMiddleware, resturantCtrl.getResturantIdByUser);

router.post("/edit/:id", authMiddleware, resturantCtrl.editResturant);

module.exports = router;