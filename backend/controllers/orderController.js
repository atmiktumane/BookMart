const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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

module.exports = { placeOrder };
