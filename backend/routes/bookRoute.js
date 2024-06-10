const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const { addBook } = require("../controllers/bookController");

const router = express.Router();

// add-book -> admin
router.post("/add-book", authenticateToken, addBook);

module.exports = router;
