const express = require('express');
const router = express.Router();
const userLogController = require('../controllers/UserLogController');
const verificationToken = require('../middlewares/VerificationToken');
const verificationRol = require('../middlewares/VerificationRol');


router.post('/create', userLogController.createUserLog);

router.get('/getAll', userLogController.getAllUserLogs);

router.get('/getAllWithUser', verificationToken, verificationRol(['superAdmin']), userLogController.getAllWithUser);

module.exports = router;