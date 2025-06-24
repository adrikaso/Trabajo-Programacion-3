const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/getAll', userController.getAllUsers);
router.get('/getUser/:email', userController.getUserByEmail);
router.post('/create', userController.createUser);

module.exports = router;