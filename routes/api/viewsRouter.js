const express = require("express");

const { home, contacts } = require("../../controllers/views");

const router = express.Router();

router.get("/", home);
router.get("/contacts", contacts);

module.exports = router;
