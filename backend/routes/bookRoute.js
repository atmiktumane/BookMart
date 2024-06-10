const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// add-book -> admin
router.post("/add-book", authenticateToken, addBook);

// update book -> admin
router.put("/update-book", authenticateToken, updateBook);

// delete book -> admin
router.delete("/delete-book", authenticateToken, deleteBook);

module.exports = router;
