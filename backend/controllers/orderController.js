const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

//@desc Place Order by user
//route POST "/api/v1/place-order"
//access Private
const placeOrder = asyncHandler(async (req, res) => {
  const { id } = req.headers;
  const { order } = req.body;

  // Validate Request body
  if (!id || !order) {
    res.status(400);
    throw new Error("UserId and OrderId is required");
  }

  for (const orderDataBook of order) {
    const newOrder = new Order({ user: id, book: orderDataBook._id });
    const orderDataFromDb = await newOrder.save();

    //saving order in User Model
    await User.findByIdAndUpdate(id, {
      $push: { orders: orderDataFromDb._id },
    });

    //clearing cart from User Model
    await User.findByIdAndUpdate(id, {
      $pull: { cart: orderDataBook._id },
    });
  }

  res.status(201).json({ message: "Order Placed Successfully" });
});

//@desc Get Order History of a particular user
//route GET "/api/v1/get-order-history"
//access Private
const getOrderHistory = asyncHandler(async (req, res) => {
  const { id } = req.headers;

  const userData = await User.findById(id).populate({
    path: "orders",
    populate: { path: "book" },
  });

  const ordersData = userData.orders.reverse();

  res
    .status(200)
    .json({ message: "Get all Order History of a user", data: ordersData });
});

//@desc Get All Orders
//route GET "/api/v1/get-all-orders"
//access Private -> Admin
const getAllOrders = asyncHandler(async (req, res) => {
  // Check whether user is admin or not -> using "ValidateTokenHandler" middleware ---> if user is admin then only proceed, otherwise give error
  const user = req.user;
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("User does not have access to get all orders of all users");
  }

  const orderData = await Order.find()
    .populate({ path: "book" })
    .populate({ path: "user" })
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json({ message: "All User's Order", allUserOrders: orderData });
});

//@desc Update Order Status
//route PUT "api/v1/update-order-status/:id"   -->  id = order id
//access Private -> Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  // Check whether user is admin or not -> using "ValidateTokenHandler" middleware ---> if user is admin then only proceed, otherwise give error
  const user = req.user;
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("Only Admin have access to update order status");
  }
  // id -> order_id
  const { id } = req.params;

  // Update order status
  await Order.findByIdAndUpdate(id, { status: req.body.status });

  res.status(200).json({ message: "Status updated successfully" });
});

module.exports = {
  placeOrder,
  getOrderHistory,
  getAllOrders,
  updateOrderStatus,
};
