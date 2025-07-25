const express = require('express');
const router = express.Router();
const itemCartController = require('../controllers/ItemCartController');

router.get('/getAll', itemCartController.getAllItemCarts);
router.post('/create', itemCartController.createItemCart);
router.put('/update/:id', itemCartController.updateItemCart);
router.put('/updateQuantity/:id', itemCartController.updateQuantity);
router.put('/incrementQuantity/:id', itemCartController.incrementQuantity); 
router.delete('/delete/:id', itemCartController.deleteItemCart);
router.delete('/deleteAll', itemCartController.deleteAllItemCarts);

module.exports = router;