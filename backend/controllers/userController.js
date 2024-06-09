const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Register the User
//route POST "/api/v1/register"
//access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, address } = req.body;

  // Simple Validation
  if (!username || !email || !password || !address) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }

  // check if username length is < 4, then throw error
  if (username.length < 4) {
    res.status(400);

    throw new Error("Username length should be greater than 3");
  }

  // check if username already exists
  const existingUsername = await User.findOne({ username: username });
  if (existingUsername) {
    res.status(400);
    throw new Error("Username already exists");
  }

  // check if email already exists
  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    res.status(400);
    throw new Error("Email Address already exists");
  }

  // check Password length -> Password should be greater than 5
  if (password.length <= 5) {
    res.status(400);
    throw new Error("Password length should be greater than 5");
  }

  // Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password : ", hashedPassword);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    address: address,
  });

  await newUser.save();

  res.status(201).json({ message: "Registered the User Successfully" });
});

module.exports = { registerUser };
