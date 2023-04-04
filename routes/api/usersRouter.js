const { Router } = require("express");

const { protect } = require("../../middlewares/auth");
const { uploadUserPhoto } = require("../../middlewares/users");
const {
  getCurrentUser,
  updateCurrentUser,
} = require("../../controllers/users");

const router = Router();

// the routes below are allowed only for logged in users
router.use(protect);

// хто залогінений, той через цей метод отримає СЕБЕ
router.get("/current", getCurrentUser);
router.patch("/avatars", uploadUserPhoto, updateCurrentUser);

module.exports = router;
