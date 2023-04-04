const { Router } = require("express");

const {
  checkRegistrationUserData,
  protect,
} = require("../../middlewares/users");

const {
  registerNewUser,
  login,
  getCurrentUser,
  logout,
} = require("../../controllers/users");

const router = Router();

router.post("/register", checkRegistrationUserData, registerNewUser);

router.post("/login", login);

// the routes below are allowed only for logged in users
router.use(protect);

// хто залогінений, той через цей метод отримає СЕБЕ
router.get("/current", getCurrentUser);

router.post("/logout", logout);

module.exports = router;
