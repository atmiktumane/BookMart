const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const { addBookInCart } = require("../controllers/cartController");

const router = express.Router();

// add book in Cart -> "PUT" method because in userModel we are updating the Cart array
router.put("/add-book-in-cart", authenticateToken, addBookInCart);

module.exports = router;
