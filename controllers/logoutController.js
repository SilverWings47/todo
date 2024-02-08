const User = require("../models/User");

const handleLogout = (req, res) => {
  res.clearCookie('token', {httpOnly : true});
  res.redirect('/login');
}

module.exports = handleLogout;