const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Add Book in Cart
//route PUT "/api/v1/add-book-in-cart"
//access Private
const addBookInCart = asyncHandler(async (req, res) => {
  // get authorized user from Token ->  getting from middleware validateTokenHandler
  const authorizedUser = req.user;

  const { id, bookid } = req.headers;

  // Validate request body
  if (!id || !bookid) {
    res.status(400);
    throw new Error("UserId and BookId are required");
  }

  const userData = await User.findById(id);

  // Verify whether user is authorized to add book to Carts or not because user cannot update Cart list of other users
  if (authorizedUser.name !== userData.username) {
    res.status(401);
    throw new Error("User is not Authorized to add book to Cart");
  }

  // check if User is present in Database or not
  if (!userData) {
    res.status(404);
    throw new Error("User is not found in database");
  }

  const isBookInCart = userData.cart.includes(bookid);

  // check if Book is already present in User's Cart
  if (isBookInCart) {
    res.status(200);
    throw new Error("Book is already present in Cart");
  }

  // all good, push Book in Cart
  await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

  res.status(200).json({ message: "Book is added to Cart" });
});

module.exports = { addBookInCart };
