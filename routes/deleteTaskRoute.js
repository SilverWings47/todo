const express = require('express');
const router = express.Router();
const deleteTask = require('../controllers/deleteTaskController');

router.put('/', deleteTask);

module.exports = router;