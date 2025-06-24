const express = require('express');
const router = express.Router();
const userLogController = require('../controllers/UserLogController');


router.post('/create', userLogController.createUserLog);

module.exports = router;