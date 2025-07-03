const { get } = require('mongoose');
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

async function getProductsActive() {
    return await repo.getProductsActive();
}

async function getProductsByCategory(categoryId) {
  return await repo.getByCategory(categoryId);
}

async function deleteById(id){
    return await repo.remove(id);
}

async function updateById(id, productUpdated) {
    return await repo.update(id, productUpdated);
}

async function getProductDetails(id) {
    return await repo.getProductDetails(id);
}

module.exports = { createProduct, getAllProducts, getProductById, deleteById, updateById, getProductDetails, getProductsByCategory, getProductsActive };