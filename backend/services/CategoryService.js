const repo = require('../persistence/repositories/CategoryRepository');

async function createCategory(data) {
    return await repo.create(data);
}

async function getAllCategories() {
    return await repo.getAll();
}

async function getCategoryById(id) {
    return await repo.getById(id);
}

async function updateCategoryById(id, categoryUpdated) {
    return await repo.update(id, categoryUpdated);  
}

async function deleteCategoryById(id){
    return await repo.remove(id);
}

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById };