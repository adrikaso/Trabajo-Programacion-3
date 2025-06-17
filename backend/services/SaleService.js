const repo = require('../persistence/repositories/SaleRepository');
const shopingService = require('./ShopingCartService');



async function createSale() {
  const total = await shopingService.getTotal();
  const clientName = await shopingService.getName();
  const date = new Date();

  return await repo.create({ clientName, date, total });
}

async function getAllSales() {
  return await repo.getAll();
}

async function getSaleById(id) {
    return await repo.getById(id);
}

async function deleteSaleById(id){
    return await repo.remove(id);
}

async function updateSaleById(id, saleUpdated) {
    return await repo.update(id, saleUpdated);
}

module.exports = { createSale, getAllSales, getSaleById, deleteSaleById, updateSaleById };