const router = require("express").Router();
const offersCtrl = require("../controllers/offer.controller");
const authMiddleware = require("../middleware/auth");

router.get("/get/:id", offersCtrl.getOffersByResturant);

router.post("/add", authMiddleware, offersCtrl.addOffer);

module.exports = router;