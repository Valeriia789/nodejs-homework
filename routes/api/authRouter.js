const { Router } = require("express");

const {
  checkRegistrationUserData,
  protect,
} = require("../../middlewares/auth");

const { registerNewUser, login, logout } = require("../../controllers/auth");

const router = Router();

router.post("/register", checkRegistrationUserData, registerNewUser);

router.post("/login", login);

// the routes below are allowed only for logged in users
router.use(protect);

router.post("/logout", logout);

module.exports = router;
