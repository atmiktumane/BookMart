const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authenticateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers["Authorization"] || req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error(
          "Token Expired. Please Login again and provide current token!"
        );
      }
      // console.log(decoded);
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("Token is missing, Authorization denied");
    }
  }
});

module.exports = authenticateToken;
