const express = require('express');
const router = express.Router();
const itemCartController = require('../controllers/ItemCartController');

router.get('/getAll', itemCartController.getAllItemCarts);
router.post('/create', itemCartController.createItemCart);
router.put('/update/:id', itemCartController.updateItemCart);
router.delete('/delete/:id', itemCartController.deleteItemCart);

module.exports = router;