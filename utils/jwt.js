const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env[JWT_SECRET]);
};

module.exports = { generateToken, verifyToken };
