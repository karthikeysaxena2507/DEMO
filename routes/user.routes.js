const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth");

router.post("/register", authMiddleware, userCtrl.registerUser);

router.post("/login", authMiddleware, userCtrl.loginUser);

router.get("/auth", authMiddleware, userCtrl.checkAuth);

router.post("/logout", authMiddleware, userCtrl.logoutUser);

router.post("/accesstoken", authMiddleware, userCtrl.renewAccessToken);

module.exports = router;