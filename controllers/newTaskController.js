const User = require("../models/User");

const addNewTask = async (req, res) => {
  const { currentUser: username, ...task } = req.body;
  try {
    const user = await User.findOne({ username });
    user.todoList.push(task);
    await user.save();
  } catch (error) {
    return res.sendStatus(500);
  }
  res.sendStatus(200);
};

module.exports = addNewTask;
