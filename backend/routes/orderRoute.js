const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  placeOrder,
  getOrderHistory,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

// place order of a particular user
router.post("/place-order", authenticateToken, placeOrder);

// Get Order History of a particular user
router.get("/get-order-history", authenticateToken, getOrderHistory);

// Get All Orders --> admin
router.get("/get-all-orders", authenticateToken, getAllOrders);

module.exports = router;
