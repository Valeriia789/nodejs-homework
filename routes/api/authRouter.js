const { Router } = require("express");

const {
  checkRegistrationUserData,
  protect,
} = require("../../middlewares/auth");

const {
  registerNewUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../../controllers/auth");

const router = Router();

router.post("/register", checkRegistrationUserData, registerNewUser);

router.post("/login", login);

// send email to restore password
router.post("/forgot-password", forgotPassword);

// reset password using otp (otp - one time password)
router.patch("/reset-password/:otp", resetPassword);

// the routes below are allowed only for logged in users
router.use(protect);

router.post("/logout", logout);

module.exports = router;
