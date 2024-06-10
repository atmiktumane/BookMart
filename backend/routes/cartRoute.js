const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  addBookInCart,
  removeBookFromCart,
  getAllBooksFromCart,
} = require("../controllers/cartController");

const router = express.Router();

// add book in Cart -> "PUT" method because in userModel we are updating the Cart array
router.put("/add-book-in-cart", authenticateToken, addBookInCart);

// Remove Book from User's Cart -> "PUT" method because in userModel we are updating the Cart array
router.put(
  "/remove-book-from-cart/:bookid",
  authenticateToken,
  removeBookFromCart
);

// get all books from Cart of a particular user
router.get("/get-user-cart", authenticateToken, getAllBooksFromCart);

module.exports = router;
