const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

const verificationToken = require('../middlewares/VerificationToken');
const verificationRol = require('../middlewares/VerificationRol');

router.get('/getAll', userController.getAllUsers);
router.get('/getUser/:email', userController.getUserByEmail);
router.post('/create', verificationToken, verificationRol(['superAdmin']), userController.createUser);

module.exports = router;