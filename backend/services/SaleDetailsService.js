const repo = require('../persistence/repositories/SaleDetailsRepository');

async function createSaleDetails(data) {
  return await repo.create(data);
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

module.exports = { createSaleDetails, getAllSaleDetails, getSaleDetailsById, deleteById, updateById };