const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Add Book to favourites
//route PUT "/api/v1/add-book-to-favourites"
//access Private
const addBookToFavourites = asyncHandler(async (req, res) => {
  // get authorized user from Token ->  getting from middleware validateTokenHandler
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
    // status code 409 : Conflict
    res.status(409);
    throw new Error("Book is already in favourites");
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

//@desc Remove book from favourites
//route PUT "api/v1/remove-book-from-favourites"
//access Private
const removeBookFromFavourites = asyncHandler(async (req, res) => {
  // get authorized user from Token ->  getting from middleware validateTokenHandler
  const authorizedUser = req.user;

  const { id, bookid } = req.headers;

  // Validate Request body
  if (!id || !bookid) {
    res.status(400);
    throw new Error("userid or bookid is not present");
  }

  //get user from Database using id
  const userData = await User.findById(id);

  // Verify whether user is authorized to remove book from favourites or not because user cannot update favourites list of other users
  if (authorizedUser.name !== userData.username) {
    res.status(401);
    throw new Error("User is not Authorized to remove book from favourites");
  }

  //check whether user is in database or not
  if (!userData) {
    res.status(404);
    throw new Error("User not found in Database");
  }

  // check if book is present in favourites or not
  const isBookInFavourites = userData.favourites.includes(bookid);

  // book is not in favourites , then throw error
  if (!isBookInFavourites) {
    res.status(400);
    throw new Error("Book is not in Favourites");
  }

  // if book is in favourites, then remove book from favourites
  await User.findByIdAndUpdate(
    id,
    { $pull: { favourites: bookid } },
    { new: true }
  );

  res.status(200).json({ message: "Book is removed from Favourites" });
});

//@desc Get all favourite books of a particular user
//route GET "api/v1/get-favourite-books"
//access Private
const getAllFavouriteBooks = asyncHandler(async (req, res) => {
  // get authorized user from Token ->  getting from middleware validateTokenHandler
  const authorizedUser = req.user;

  const { id } = req.headers;

  // Validate request body
  if (!id) {
    res.status(400);
    throw new Error("UserId is required");
  }

  // get user data from database using id
  const userData = await User.findById(id).populate("favourites");

  // Verify whether user is authorized to remove book from favourites or not because user cannot update favourites list of other users
  if (authorizedUser.name !== userData.username) {
    res.status(401);
    throw new Error("User is not Authorized to get all books from favourites");
  }

  // check if User is present in Database or not
  if (!userData) {
    res.status(404);
    throw new Error("User is not found in database");
  }

  // Get Favourites array from User
  const favouriteBooks = userData.favourites;

  res.status(200).json({ message: "Got all FavouriteBooks", favouriteBooks });
});

module.exports = {
  addBookToFavourites,
  removeBookFromFavourites,
  getAllFavouriteBooks,
};
