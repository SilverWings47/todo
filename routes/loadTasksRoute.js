const express = require('express');
const router = express.Router();
const loadTasks = require('../controllers/loadTasksController');

router.post('/', loadTasks);

module.exports = router;