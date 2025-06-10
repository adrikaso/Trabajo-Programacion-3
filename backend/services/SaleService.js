const repo = require('../repositories/SaleRepository');

async function createSale(data) {
  return await repo.create(data);
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