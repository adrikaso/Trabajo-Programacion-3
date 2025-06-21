const express = require('express');
const router = express.Router();
const shopingCartController = require('../controllers/ShopingCartController');

router.get('/getAll', shopingCartController.getAllShopingCarts);
router.get('/getTotal', shopingCartController.getTotal);
router.post('/create', shopingCartController.createShopingCart);
router.delete('/delete', shopingCartController.deleteShopingCart);
module.exports = router;