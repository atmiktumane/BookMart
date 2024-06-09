// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require("express");

// Import custom connections
const connectDB = require("./config/dbConnection");

// Initialize the Express application
const app = express();

// Connect to MongoDB
connectDB();

// Define the port from environment variables or use default
const port = process.env.PORT || 5000;

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
