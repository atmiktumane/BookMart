const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// User Registration
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

module.exports = router;
