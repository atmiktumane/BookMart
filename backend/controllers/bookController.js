const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

//@desc Add Book in Database
//route POST "api/v1/add-book"
//access Private -> Admin
const addBook = asyncHandler(async (req, res) => {
  // Check whether user is admin or not -> using "ValidateTokenHandler" middleware ---> if user is admin then only add book, otherwise give error
  const user = req.user;
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("User does not have access to add book");
  }

  const { url, title, author, price, desc, language } = req.body;

  // Validate Request body
  if (!url || !title || !author || !price || !desc || !language) {
    res.status(400);
    throw new Error("All the details of book are mandatory to fill");
  }

  // create new book
  const newBook = new Book({
    url,
    title,
    author,
    price,
    desc,
    language,
  });

  await newBook.save();

  res.status(201).json({ message: "Book added Successfully" });
});

//@desc Update the book -> admin
//route PUT "/api/v1/update-book"
//access Private -> Admin
const updateBook = asyncHandler(async (req, res) => {
  // Check whether user is admin or not -> using "ValidateTokenHandler" middleware ---> if user is admin then only update book, otherwise give error
  const user = req.user;
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("User does not have access to add book");
  }

  const { bookid } = req.headers;

  // validate request body/headers : check if bookid is received correctly or not
  if (!bookid) {
    res.status(400);
    throw new Error("bookid is not received in headers");
  }

  // check if book is present in Database or not
  const bookToBeUpdated = await Book.findById(bookid);
  if (!bookToBeUpdated) {
    res.status(400);
    throw new Error("bookToBeUpdated is not present in Database");
  }

  // Update Book
  const updatedBook = await Book.findByIdAndUpdate(bookid, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ message: "Book Updated Successfully", updateData: updatedBook });
});

//@desc Delete the Book
//route DELETE "api/v1/delete-book"
//access Private -> Admin
const deleteBook = asyncHandler(async (req, res) => {
  // "req.user" -> getting from "validateTokenHandler" middleware
  const user = req.user;

  if (user.role !== "admin") {
    res.status(401);
    throw new Error("User don't have access to delete Book");
  }

  const { bookid } = req.headers;

  // check if bookid is received correctly or not
  if (!bookid) {
    res.status(400);
    throw new Error("bookid is not present in headers");
  }

  // check if book is present in Database or not
  const bookToBeDeleted = await Book.findById(bookid);
  if (!bookToBeDeleted) {
    res.status(400);
    throw new Error("bookToBeDeleted is not present in Database");
  }

  // Delete Book
  const deletedBook = await Book.findByIdAndDelete(bookid);

  res.status(200).json({
    message: "Deleted Book Successfully",
    DeletedBook: deletedBook,
  });
});

module.exports = { addBook, updateBook, deleteBook };
