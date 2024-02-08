const jwt = require('jsonwebtoken');
const User = require("../models/User");

const handleProfile = (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      return res.status(200).json({username: decoded.username});
    });
}

module.exports = handleProfile;