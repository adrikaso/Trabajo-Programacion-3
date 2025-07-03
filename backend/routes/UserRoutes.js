const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

const verificationToken = require('../middlewares/VerificationToken');
const verificationRol = require('../middlewares/VerificationRol');

router.get('/getAll', userController.getAllUsers);
router.get('/getById/:id', userController.getUserById);
router.get('/getUser/:email', userController.getUserByEmail);
router.put('/update/:id', userController.updateUser);
router.post('/create', verificationToken, verificationRol(['superAdmin']), userController.createUser);

module.exports = router;