const repo = require('../persistence/repositories/ProductRepository');

async function createProduct(data) {
  return await repo.create(data);
}

async function getAllProducts() {
  return await repo.getAll();
}

async function getProductById(id) {
    return await repo.getById(id);
}

async function deleteById(id){
    return await repo.remove(id);
}

async function updateById(id, productUpdated) {
    return await repo.update(id, productUpdated);
}

module.exports = { createProduct, getAllProducts, getProductById, deleteById, updateById };