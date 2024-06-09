// mongoDb gives response data as promise,
// in order to handle promise, we use try-catch block in controllers to handle exceptions
// instead of try-catch block, we can use express-async-handler.
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

//@desc login User
//route POST "/api/v1/login"
//access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // simple validation
  if (!username || !password) {
    res.json(400);
    throw new Error("All Fields are mandatory to Login");
  }

  // Check if User exists in database
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    res.status(400);
    throw new Error("Username does not exists");
  }

  // Check Password : Compare req.password with HashedPassword present in database
  const isMatchPass = await bcrypt.compare(password, existingUser.password);
  if (!isMatchPass) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Create JWT Payload
  const jwtPayload = {
    user: {
      name: existingUser.username,
      role: existingUser.role,
    },
  };

  // Sign JWT Token : Generate Token
  const accessToken = jwt.sign(
    jwtPayload,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "30d" } // Token expires in 30 days
  );

  res.status(201).json({
    id: existingUser._id,
    role: existingUser.role,
    token: accessToken,
  });
});

module.exports = { registerUser, loginUser };
