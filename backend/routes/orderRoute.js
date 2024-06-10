const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const { placeOrder } = require("../controllers/orderController");

const router = express.Router();

// place order of a particular user
router.post("/place-order", authenticateToken, placeOrder);

module.exports = router;
