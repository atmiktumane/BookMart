const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//@desc Register the User
//route POST "/api/v1/register"
//access Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Simple Validation
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All the fields are mandatory" });
    }

    // check if username length is < 4, then throw error
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    // check if username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // check if email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Address already exists" });
    }

    // check Password length -> Password should be greater than 5
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 5" });
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

    return res
      .status(201)
      .json({ message: "Registered the User Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { registerUser };
