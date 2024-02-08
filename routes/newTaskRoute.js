const express = require('express');
const router = express.Router();
const addNewTask = require('../controllers/newTaskController');

router.put('/', addNewTask);

module.exports = router;