const { Router } = require("express");

const { protect } = require("../../middlewares/auth");
const { uploadUserPhoto, checkPassword } = require("../../middlewares/users");
const {
  getCurrentUser,
  updateCurrentUser,
  updateMyPassword,
} = require("../../controllers/users");

const router = Router();

// the routes below are allowed only for logged in users
router.use(protect);

// хто залогінений, той через цей метод отримає СЕБЕ
router.get("/current", getCurrentUser);
router.patch("/avatars", uploadUserPhoto, updateCurrentUser);
router.patch('/update-my-password', checkPassword, updateMyPassword)

module.exports = router;
