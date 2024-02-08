const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });

  if (!foundUser) return res.status(400).json({ message: "User not found" });
  const isPassOk = await bcrypt.compare(password, foundUser.password);
  if (!isPassOk) return res.status(400).json({ message: "Password incorrect" });

  jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {}, (err, token) => {
    if (err) throw err;

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ accessToken: token });
  });
};

module.exports = handleLogin;
