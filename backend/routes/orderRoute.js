const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  placeOrder,
  getOrderHistory,
} = require("../controllers/orderController");

const router = express.Router();

// place order of a particular user
router.post("/place-order", authenticateToken, placeOrder);

// Get Order History of a particular user
router.get("/get-order-history", authenticateToken, getOrderHistory);

module.exports = router;
