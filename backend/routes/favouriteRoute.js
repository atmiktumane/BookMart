const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  addBookToFavourites,
  removeBookFromFavourites,
} = require("../controllers/favouriteController");

const router = express.Router();

//add book to favourites -> "PUT" method because in userModel we are updating the favourites array
router.put("/add-book-to-favourites", authenticateToken, addBookToFavourites);

//remove book from favourites -> "PUT" method because in userModel we are updating the favourites array
router.put(
  "/remove-book-from-favourites",
  authenticateToken,
  removeBookFromFavourites
);

module.exports = router;
