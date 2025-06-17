const repo = require('../persistence/repositories/ShopingCartRepository');

async function getId() {
    return await repo.getId();
}

async function getName(){
    return await repo.getName();
}

async function getTotal(){
    return await repo.getTotal();
}

async function createShopingCart(name, total) {
    return await repo.create({ name, total });
}

async function resetCart() {
    return await repo.reset();
}

module.exports = { getName, getId,createShopingCart, resetCart };