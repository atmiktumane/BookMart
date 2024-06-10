const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// User Registration
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

// current user -> get current user info
router.get("/current-user", authenticateToken, currentUser);

module.exports = router;
