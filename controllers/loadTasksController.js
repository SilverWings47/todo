const User = require("../models/User");

const loadTasks = async (req, res) => {
  const username = req.body.user;
  const user = await User.findOne({ username });
  const taskList = user.todoList;

  res.json(taskList);
};

module.exports = loadTasks;
