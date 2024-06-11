const express = require("express");
const authenticateToken = require("../middleware/validateTokenHandler");
const {
  placeOrder,
  getOrderHistory,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// place order of a particular user
router.post("/place-order", authenticateToken, placeOrder);

// Get Order History of a particular user
router.get("/get-order-history", authenticateToken, getOrderHistory);

// Get All Orders --> admin
router.get("/get-all-orders", authenticateToken, getAllOrders);

// Update Order Status --> admin
router.put("/update-order-status/:id", authenticateToken, updateOrderStatus);

module.exports = router;
