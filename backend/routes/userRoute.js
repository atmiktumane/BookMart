const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateAddress,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// User Registration
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

// current user -> get current user info
router.get("/current-user", authenticateToken, currentUser);

// update address of current user
router.put("/update-address", authenticateToken, updateAddress);

module.exports = router;
