const express = require('express');
const router = express.Router();
const shopingCartController = require('../controllers/ShopingCartController');

router.get('/getAll', shopingCartController.getAllShopingCarts);
router.post('/create', shopingCartController.createShopingCart);

module.exports = router;