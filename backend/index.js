// Load environment variables from .env file
const dotenv = require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");

// Import custom middlewares & connections
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

// Initialize the Express application
const app = express();

app.use(
  cors({
    origin: ["https://bookmart-stores.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
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

// Define the port from environment variables or use default
const port = process.env.PORT || 5000;

const server = http.createServer(app);

// Start the Server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
