const User = require("../models/User");
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password,10);
  await User.create({
    username : username,
    password : hashedPassword
  });

  return res.status(201);
};

module.exports = handleRegister;
