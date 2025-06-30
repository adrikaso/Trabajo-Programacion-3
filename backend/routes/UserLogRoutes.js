const express = require('express');
const router = express.Router();
const userLogController = require('../controllers/UserLogController');


router.post('/create', userLogController.createUserLog);

router.get('/getAll', userLogController.getAllUserLogs);

router.get('/getAllWithUser', userLogController.getAllWithUser);

module.exports = router;