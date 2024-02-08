const User = require("../models/User");

const deleteTask = async (req, res) => {
  const { currentUser: username, taskId } = req.body;

  try {
    await User.updateOne(
      { username: username },
      { $pull: { todoList: { taskId: taskId } } }
    );
  } catch (e) {
    return res.sendStatus(500);
  }

  res.sendStatus(200);
};

module.exports = deleteTask;
