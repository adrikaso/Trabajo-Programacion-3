const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/getAll', categoryController.getAllCategories);

module.exports = router;