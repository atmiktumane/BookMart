const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Add Book to favourites
//route PUT "/api/v1/add-book-to-favourites"
//access Private
const addBookToFavourites = asyncHandler(async (req, res) => {
  const authorizedUser = req.user;
  const { id, bookid } = req.headers;

  // Validate request body
  if (!id || !bookid) {
    res.status(400);
    throw new Error("UserId and BookId are required");
  }

  const userData = await User.findById(id);

  // Verify whether user is authorized to add book to favourites or not because user cannot update favourites list of other users
  if (authorizedUser.name !== userData.username) {
    res.status(401);
    throw new Error("User is not Authorized to add book to favourites");
  }

  // check if User is present in Database or not
  if (!userData) {
    res.status(404);
    throw new Error("User is not found in database");
  }

  // check if the book is already present in user's favourites or not
  const isBookInFavourites = userData.favourites.includes(bookid);
  if (isBookInFavourites) {
    return res.status(200).json({ message: "Book is already in favourites" });
  }

  const addBookInFavourites = await User.findByIdAndUpdate(
    id,
    { $push: { favourites: bookid } },
    { new: true }
  );

  res.status(200).json({
    message: "Added book to favourites",
    userDetails: {
      username: addBookInFavourites.username,
      favourites: addBookInFavourites.favourites,
    },
  });
});

module.exports = { addBookToFavourites };
