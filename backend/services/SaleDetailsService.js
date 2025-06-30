const repo = require('../persistence/repositories/SaleDetailsRepository');
const itemCartService = require('./ItemCartService');

async function createSaleDetails(saleId) {
  let list=await itemCartService.getAllItemCarts();
  for (const itemCart of list) {
    const data = {
      saleId: saleId,
      productId: itemCart.productId,
      quantity: itemCart.quantity,
      subtotal: itemCart.unitPrice * itemCart.quantity
    };
    await repo.create(data);
  }
  return await repo.getAll();
}



async function getAllSaleDetails() {
  return await repo.getAll();
}

async function getSaleDetailsById(id) {
    return await repo.getById(id);
}

async function deleteById(id){
    return await repo.remove(id);
}

async function updateById(id, detailsUpdated) {
    return await repo.update(id, detailsUpdated);
}

async function getSaleDetailsBySaleId(saleId) {
  return await repo.getBySaleId(saleId);
}

module.exports = { createSaleDetails, getAllSaleDetails, getSaleDetailsById, deleteById, updateById, getSaleDetailsBySaleId };