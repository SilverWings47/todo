const express = require('express');
const router = express.Router();
const handleProfile = require('../controllers/profileController');

router.get('/', handleProfile);

module.exports = router;