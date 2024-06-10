const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

//@desc Add Book in Database
//route POST "api/v1/add-book"
//access Private -> Admin
const addBook = asyncHandler(async (req, res) => {
  // Check whether user is admin or not -> using "ValidateTokenHandler" middleware ---> if user is admin then only add book, otherwise give error
  const userr = req.user;
  if (userr.role !== "admin") {
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

module.exports = { addBook };
