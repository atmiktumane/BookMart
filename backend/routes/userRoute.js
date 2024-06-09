const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// User Registration
router.post("/register", registerUser);

module.exports = router;
