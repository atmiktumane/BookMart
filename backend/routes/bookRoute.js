const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
} = require("../controllers/bookController");

const router = express.Router();

// add-book -> admin
router.post("/add-book", authenticateToken, addBook);

// update book -> admin
router.put("/update-book", authenticateToken, updateBook);

// delete book -> admin
router.delete("/delete-book", authenticateToken, deleteBook);

// get all books
router.get("/get-all-books", getAllBooks);

// get recently added books limit to 4 books
router.get("/get-recent-books", getRecentBooks);

module.exports = router;
