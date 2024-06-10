const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const { addBookToFavourites } = require("../controllers/favouriteController");

const router = express.Router();

//add book to favourites -> "PUT" method because in userModel we are updating the favourites array
router.put("/add-book-to-favourites", authenticateToken, addBookToFavourites);

module.exports = router;
