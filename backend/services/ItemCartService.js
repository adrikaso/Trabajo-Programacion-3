const { findById } = require('../persistence/models/ItemCartModel');
const repo = require('../persistence/repositories/ItemCartRepository');
const ShopingCartService = require('./ShopingCartService');


async function getAllItemCarts() {
    return await repo.getAll();
}

async function createItemCart({productId, productName, unitPrice, quantity}) {
    const cart = await ShopingCartService.getId();
    const idShopingCart = cart?._id.toString();

    const data = {
        shopingCartId: idShopingCart,
        productId,
        productName,
        unitPrice,
        quantity
    };

    const itemCart = await repo.create(data);
    await calculateSubtotalAndUpdateShopingCart(itemCart);
    return itemCart;
}

async function calculateSubtotalAndUpdateShopingCart(itemCart, negative = false) {  //si es true, se resta el subtotal
    const shopingCartId = itemCart.shopingCartId.toString();
    let subtotal = itemCart.unitPrice * itemCart.quantity;
    if (negative==true) {
        subtotal = subtotal*-1;
        console.log("se resta el subtotal: "+subtotal);
    }
    console.log("se suma el subtotal: "+subtotal);
    await ShopingCartService.incrementTotal(shopingCartId, subtotal);
}

async function updateItemCart(id, data) {
    findByIdAndUpdateShopingCart(id);
    const itemCart = await repo.update(id, data);
    await calculateSubtotalAndUpdateShopingCart(itemCart);
    return itemCart;
}

async function updateQuantity(id, data) {
    await findByIdAndUpdateShopingCart(id);
    await repo.updateQuantity(id, data);
    const itemCart = await repo.getById(id); 
    
    await calculateSubtotalAndUpdateShopingCart(itemCart);
    return itemCart;
}

async function incremetQuantity(id){
    await findByIdAndUpdateShopingCart(id);
    await repo.updateQuantity(id,{$inc:{quantity:1}});
    
    const itemCart = await repo.getById(id);

    console.log("ItemCart Actualizado: " + itemCart.shopingCartId);
    await calculateSubtotalAndUpdateShopingCart(itemCart);
    return itemCart;
}

async function deleteItemCart(id) {
    findByIdAndUpdateShopingCart(id);
    return await repo.remove(id);
}

async function findByIdAndUpdateShopingCart(id){    //busca el itemCart, obtiene el subtotal y lo resta al carrito
    const itemCart = await repo.getById(id);
    console.log("ItemCart = " + itemCart);
    await calculateSubtotalAndUpdateShopingCart(itemCart, true); 
}

async function deleteAllItemCarts() {
    return await repo.removeAll();
}

module.exports = { getAllItemCarts, createItemCart, updateItemCart, updateQuantity, incremetQuantity,  deleteItemCart, deleteAllItemCarts };