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

async function incrementTotal(id,subtotal){
    return await repo.updateTotal(id,{$inc:{total:subtotal}});
}


async function deleteCart() {
    return await repo.removeAll();
}

module.exports = { getName, getTotal, getId,createShopingCart, deleteCart, incrementTotal };