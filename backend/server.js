// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();

// Use the port specified in the environment variable, or default to 4004
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
