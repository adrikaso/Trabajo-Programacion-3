const repo = require('../persistence/repositories/ItemCartRepository');
const ShopingCartService = require('./ShopingCartService');


async function getAllItemCarts() {
    return await repo.getAll();
}

async function createItemCart({productId, productName, unitPrice, quantity}) {
    const cart = await ShopingCartService.getId();
    const idShopingCart = cart?._id.toString();
    
    console.log(idShopingCart);

    const data = {
        shopingCartId: idShopingCart,
        productId,
        productName,
        unitPrice,
        quantity
    };

    return await repo.create(data);
}

async function updateItemCart(id, data) {
    return await repo.update(id, data);
}

async function deleteItemCart(id) {
    return await repo.remove(id);
}

module.exports = { getAllItemCarts, createItemCart, updateItemCart, deleteItemCart };