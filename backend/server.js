// Load environment variables from .env file
const dotenv = require("dotenv").config();

// import path for deployment
const path = require("path");

// Import required packages
const express = require("express");
const cors = require("cors");

// Import custom middlewares & connections
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

// Initialize the Express application
const app = express();

app.use(cors());

// Middleware to parse incoming requests with  JSON payloads (from req.body)
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define the routes
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1", require("./routes/bookRoute"));
app.use("/api/v1", require("./routes/favouriteRoute"));
app.use("/api/v1", require("./routes/cartRoute"));
app.use("/api/v1", require("./routes/orderRoute"));

// Error handling middleware
app.use(errorHandler);

// Deployment
app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Define the port from environment variables or use default
const port = process.env.PORT || 5000;

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
